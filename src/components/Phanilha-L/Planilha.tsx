import RGL, { WidthProvider } from 'react-grid-layout'
const ReactGridLayout = WidthProvider(RGL)

export interface I_Layout {
  h: number
  i: string
  moved?: boolean | undefined
  static?: boolean | undefined
  w: number
  x: number
  y: number
  minH?: number
  minW?: number
  code?: string
}

export default function Planilha({
  resetLayout,
  layouts,
  onLayoutChange,
  config,
}) {
  return (
    <div>
      <ReactGridLayout
        {...config}
        layout={layouts}
        onLayoutChange={onLayoutChange}
        compactType="No Compaction"
        // allowOverlap={true}
      >
        {layouts.map((layout: I_Layout) => (
          <div
            key={layout.i}
            data-grid={{
              w: 2,
              h: layout.h,
              x: 0,
              y: 0,
              static: false,
            }}
          >
            <span className="text">{layout.i}</span>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  )
}
