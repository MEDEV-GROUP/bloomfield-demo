"use client"

import { createContext, useContext, useSyncExternalStore, useCallback } from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}

let listeners: (() => void)[] = []

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "dark"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function getServerSnapshot(): Theme {
  return "dark"
}

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function setTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark")
  localStorage.setItem("bloomfield-theme", next)
  listeners.forEach((l) => l())
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme])

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  )
}

// Script to inject in head to avoid flash — reads localStorage before paint
export function ThemeScript() {
  const script = `
    (function() {
      var t = localStorage.getItem('bloomfield-theme');
      if (t === 'light') document.documentElement.classList.remove('dark');
    })()
  `
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
