"use client"

import { tourSteps } from "@/data/tour-steps"
import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import Joyride, {
  ACTIONS,
  type CallBackProps,
  EVENTS,
  STATUS,
} from "react-joyride"

interface TourContextValue {
  startTour: () => void
  isRunning: boolean
}

const TourContext = createContext<TourContextValue>({
  startTour: () => { },
  isRunning: false,
})

export function useTour() {
  return useContext(TourContext)
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [run, setRun] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const navigatingRef = useRef(false)

  const startTour = useCallback(() => {
    const firstPage = tourSteps[0]?.page ?? "/"
    if (pathname !== firstPage) {
      navigatingRef.current = true
      router.push(firstPage)
      // Wait for navigation then start
      setTimeout(() => {
        navigatingRef.current = false
        setStepIndex(0)
        setRun(true)
      }, 600)
    } else {
      setStepIndex(0)
      setRun(true)
    }
  }, [pathname, router])

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { action, index, status, type } = data

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRun(false)
        setStepIndex(0)
        return
      }

      if (type === EVENTS.STEP_AFTER) {
        if (action === ACTIONS.CLOSE) {
          setRun(false)
          setStepIndex(0)
          return
        }

        const nextIndex = action === ACTIONS.PREV ? index - 1 : index + 1

        if (nextIndex >= 0 && nextIndex < tourSteps.length) {
          const nextStep = tourSteps[nextIndex]
          const currentStep = tourSteps[index]

          if (nextStep.page !== currentStep.page) {
            // Navigate to the next page, then resume
            setRun(false)
            navigatingRef.current = true
            router.push(nextStep.page)

            setTimeout(() => {
              navigatingRef.current = false
              setStepIndex(nextIndex)
              setRun(true)
            }, 600)
          } else {
            setStepIndex(nextIndex)
          }
        } else {
          // If out of bounds or finished, ensure we stop running
          setRun(false)
          setStepIndex(0)
        }
      }
    },
    [router]
  )

  return (
    <TourContext.Provider value={{ startTour, isRunning: run }}>
      {children}
      <Joyride
        steps={tourSteps}
        run={run}
        stepIndex={stepIndex}
        continuous
        showProgress
        showSkipButton
        callback={handleCallback}
        disableOverlayClose
        spotlightClicks={false}
        locale={{
          back: "Précédent",
          close: "Fermer",
          last: "Terminer",
          next: "Suivant",
          skip: "Passer",
        }}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "var(--popover)",
            backgroundColor: "var(--popover)",
            textColor: "var(--popover-foreground)",
            primaryColor: "var(--primary)",
            overlayColor: "rgba(0, 0, 0, 0.6)",
          },
          tooltip: {
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid var(--border)",
          },
          tooltipTitle: {
            fontSize: "14px",
            fontWeight: 600,
          },
          tooltipContent: {
            fontSize: "13px",
            lineHeight: 1.5,
          },
          buttonNext: {
            borderRadius: "6px",
            fontSize: "12px",
            padding: "6px 16px",
          },
          buttonBack: {
            color: "var(--muted-foreground)",
            fontSize: "12px",
          },
          buttonSkip: {
            color: "var(--muted-foreground)",
            fontSize: "12px",
          },
          spotlight: {
            borderRadius: "8px",
          },
        }}
      />
    </TourContext.Provider>
  )
}
