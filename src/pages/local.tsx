import React, { useState, useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
const ReactGridLayout = WidthProvider(RGL)

interface I_Layout {
  h: number
  i: string
  moved?: boolean | undefined
  static?: boolean | undefined
  w: number
  x: number
  y: number
  minH?: number
  minW?: number
}

LocalStorageLayout.defaultProps = {
  className: 'layout',
  cols: 80,
  rowHeight: 2,
}

export default function LocalStorageLayout(props: any) {
  const [layouts, setLayouts] = useState<I_Layout[] | [] | any>([])

  function resetLayout() {
    setLayouts([])
  }

  useEffect(() => {
    // setLayouts(loadLocalStorage())
  }, [])

  useEffect(() => {
    console.log('layouts', layouts), [layouts]
  })

  function onLayoutChange(layout: I_Layout[]) {
    /*eslint no-console: 0*/
    saveLocalStorage(layout)
    console.log({ layout })
    setLayouts(layout)
  }

  function addLayout() {
    setLayouts((prev: I_Layout[] | []) => {
      const len = prev.length
      const newLayout: I_Layout[] = [
        ...prev,
        {
          h: 3,
          i: len.toString(),
          moved: false,
          static: false,
          w: 4,
          x: prev.length > 0 ? prev[len - 1].x + prev[len - 1].w : 1,
          y: 0,
          minH: 2,
          minW: 3,
        },
      ]
      saveLocalStorage(newLayout)
      return newLayout
    })
  }

  return (
    <div>
      <button onClick={() => addLayout()}>Add layout</button>
      {layouts.length > 0 && layouts[0].h ? (
        <div>
          <button onClick={resetLayout}>Reset Layout</button>
          <ReactGridLayout
            {...props}
            layout={layouts}
            onLayoutChange={onLayoutChange}
            compactType="No Compaction"
            allowOverlap={true}
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
      ) : (
        <div>Vazio</div>
      )}
    </div>
  )
}

function saveLocalStorage(layout: I_Layout[] | []) {
  if (layout.length === 0) return
  if (global.localStorage) {
    global.localStorage.setItem('rgl-7', JSON.stringify(layout))
  }
}

function loadLocalStorage() {
  if (global.localStorage) {
    return JSON.parse(global.localStorage.getItem('rgl-7') || '[]')
  }
}
