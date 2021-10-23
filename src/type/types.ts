export interface GenerateLayout {
  x: number
  y: number
  w: number
  h: number
  i: string
  // static: boolean.
  code?: string
}

export interface IShowcaseLayout {
  className: string
  rowHeight: number
  onLayoutChange: (layout: any) => void
  cols: { lg: number; md: number; sm: number; xs: number; xxs: number }
  initialLayout: GenerateLayout[]
  fixed: boolean
}
