import { create } from "zustand"

export type WindowType =
  | "INDICES"
  | "MOVERS"
  | "ORDER_BOOK"
  | "INTRADAY_CHART"
  | "NEWS"
  | "ALERTS"
  | "MACRO"

// Layout blueprint — proportions relative to container
const G = 4 // gap in px
const LAYOUT_BLUEPRINT = [
  // Row 1 (45% height): Indices 25% | Movers 40% | Order Book 35%
  { title: "Indices BRVM", type: "INDICES" as WindowType, row: 0, colFrac: 0.25, colOffset: 0 },
  { title: "Top Movers", type: "MOVERS" as WindowType, row: 0, colFrac: 0.40, colOffset: 0.25 },
  { title: "Carnet d'ordres \u2014 SNTS", type: "ORDER_BOOK" as WindowType, row: 0, colFrac: 0.35, colOffset: 0.65 },
  // Row 2 (55% height): equal thirds
  { title: "SONATEL \u2014 Intraday", type: "INTRADAY_CHART" as WindowType, row: 1, colFrac: 1 / 3, colOffset: 0 },
  { title: "Actualit\u00e9s", type: "NEWS" as WindowType, row: 1, colFrac: 1 / 3, colOffset: 1 / 3 },
  { title: "Alertes", type: "ALERTS" as WindowType, row: 1, colFrac: 1 / 3, colOffset: 2 / 3 },
]
const ROW_HEIGHTS = [0.45, 0.55] // row 0 = 45%, row 1 = 55%

export function computeDefaultLayout(containerW: number, containerH: number): Omit<WindowNode, "zIndex" | "isMinimized" | "isMaximized" | "id">[] {
  return LAYOUT_BLUEPRINT.map((item) => {
    const rowY = ROW_HEIGHTS.slice(0, item.row).reduce((s, h) => s + h * containerH, 0)
    const rowH = ROW_HEIGHTS[item.row] * containerH
    return {
      title: item.title,
      type: item.type,
      x: Math.round(item.colOffset * containerW + G),
      y: Math.round(rowY + G),
      width: Math.round(item.colFrac * containerW - G * 2),
      height: Math.round(rowH - G * 2),
    }
  })
}

export interface WindowNode {
  id: string
  title: string
  type: WindowType
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  prevBounds?: { x: number; y: number; width: number; height: number }
}

export interface WindowBounds {
  x: number
  y: number
  width: number
  height: number
}

interface WindowStore {
  windows: WindowNode[]
  nextZIndex: number

  openWindow: (type: WindowType, title: string, defaultBounds?: Partial<Pick<WindowNode, "x" | "y" | "width" | "height">>) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, x: number, y: number) => void
  updateSize: (id: string, width: number, height: number) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string, maximizeBounds?: WindowBounds) => void
  initializeDefaults: (containerW: number, containerH: number) => void
  resetLayout: (containerW: number, containerH: number) => void
}

let windowIdCounter = 0
function generateId(): string {
  windowIdCounter += 1
  return `win-${windowIdCounter}`
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 1,

  openWindow: (type, title, defaultBounds) => {
    const { windows, nextZIndex } = get()

    // If a window of this type already exists, focus it instead
    const existing = windows.find((w) => w.type === type)
    if (existing) {
      get().focusWindow(existing.id)
      if (existing.isMinimized) {
        get().toggleMinimize(existing.id)
      }
      return
    }

    const offset = (windows.length % 8) * 30
    const newWindow: WindowNode = {
      id: generateId(),
      title,
      type,
      x: defaultBounds?.x ?? 50 + offset,
      y: defaultBounds?.y ?? 20 + offset,
      width: defaultBounds?.width ?? 420,
      height: defaultBounds?.height ?? 340,
      zIndex: nextZIndex,
      isMinimized: false,
      isMaximized: false,
    }

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }))
  },

  focusWindow: (id) => {
    const { nextZIndex } = get()
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      nextZIndex: nextZIndex + 1,
    }))
  },

  updatePosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    }))
  },

  updateSize: (id, width, height) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    }))
  },

  toggleMinimize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }))
  },

  toggleMaximize: (id, maximizeBounds) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w
        if (w.isMaximized) {
          // Restore previous bounds
          return {
            ...w,
            isMaximized: false,
            x: w.prevBounds?.x ?? w.x,
            y: w.prevBounds?.y ?? w.y,
            width: w.prevBounds?.width ?? w.width,
            height: w.prevBounds?.height ?? w.height,
            prevBounds: undefined,
          }
        }
        // Save current bounds and maximize
        return {
          ...w,
          isMaximized: true,
          prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: maximizeBounds?.x ?? 0,
          y: maximizeBounds?.y ?? 0,
          width: maximizeBounds?.width ?? window.innerWidth,
          height: maximizeBounds?.height ?? window.innerHeight - 40,
        }
      }),
    }))
  },

  initializeDefaults: (containerW, containerH) => {
    const defs = computeDefaultLayout(containerW, containerH)
    const initialWindows: WindowNode[] = defs.map((def, i) => ({
      ...def,
      id: generateId(),
      zIndex: i + 1,
      isMinimized: false,
      isMaximized: false,
    }))
    set({
      windows: initialWindows,
      nextZIndex: defs.length + 1,
    })
  },

  resetLayout: (containerW, containerH) => {
    const defs = computeDefaultLayout(containerW, containerH)
    set((state) => {
      const newWindows = defs.map((def, i) => {
        const existing = state.windows.find((w) => w.type === def.type)
        return {
          ...def,
          id: existing?.id ?? generateId(),
          zIndex: i + 1,
          isMinimized: false,
          isMaximized: false,
          prevBounds: undefined,
        }
      })
      return {
        windows: newWindows,
        nextZIndex: defs.length + 1,
      }
    })
  },
}))
