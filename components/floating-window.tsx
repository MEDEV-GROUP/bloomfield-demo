"use client"

import { cn } from "@/lib/utils"
import {
  useWindowStore,
  type WindowBounds,
  type WindowNode,
} from "@/store/window-store"
import { Maximize2, Minimize2, Minus, X } from "lucide-react"
import { useCallback, useRef } from "react"
import { Rnd } from "react-rnd"

interface FloatingWindowProps {
  window: WindowNode
  children: React.ReactNode
  tourId?: string
  getMaximizeBounds?: () => WindowBounds | undefined
}

export function FloatingWindow({
  window: win,
  children,
  tourId,
  getMaximizeBounds,
}: FloatingWindowProps) {
  const { focusWindow, updatePosition, updateSize, closeWindow, toggleMinimize, toggleMaximize } =
    useWindowStore()

  const rndRef = useRef<Rnd | null>(null)

  const handleMouseDown = useCallback(() => {
    focusWindow(win.id)
  }, [focusWindow, win.id])

  if (win.isMinimized) {
    return null
  }

  return (
    <Rnd
      data-tour={tourId}
      ref={rndRef}
      size={{ width: win.width, height: win.height }}
      position={{ x: win.x, y: win.y }}
      minWidth={280}
      minHeight={200}
      style={{ zIndex: win.zIndex }}
      dragHandleClassName="window-drag-handle"
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      onDragStop={(_e, data) => {
        updatePosition(win.id, data.x, data.y)
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        updateSize(win.id, ref.offsetWidth, ref.offsetHeight)
        updatePosition(win.id, position.x, position.y)
      }}
      onMouseDown={handleMouseDown}
      bounds="parent"
      className={cn(
        "absolute rounded-lg border border-border bg-card shadow-xl",
        "transition-shadow duration-150",
        "hover:shadow-2xl"
      )}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg">
        {/* Titlebar */}
        <div
          className="window-drag-handle flex h-9 shrink-0 cursor-grab items-center justify-between border-b border-border bg-accent/60 px-3 active:cursor-grabbing"
        >
          <span className="select-none truncate text-xs font-medium text-foreground">
            {win.title}
          </span>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleMinimize(win.id)
              }}
              className="flex size-6 items-center justify-center rounded transition-colors hover:bg-muted"
              title="Minimiser"
            >
              <Minus className="size-3 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleMaximize(win.id, getMaximizeBounds?.())
              }}
              className="flex size-6 items-center justify-center rounded transition-colors hover:bg-muted"
              title={win.isMaximized ? "Restaurer" : "Maximiser"}
            >
              {win.isMaximized ? (
                <Minimize2 className="size-3 text-muted-foreground" />
              ) : (
                <Maximize2 className="size-3 text-muted-foreground" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(win.id)
              }}
              className="flex size-6 items-center justify-center rounded transition-colors hover:bg-destructive/20 hover:text-destructive"
              title="Fermer"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3">
          {children}
        </div>
      </div>
    </Rnd>
  )
}
