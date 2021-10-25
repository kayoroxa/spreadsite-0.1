import RGL, { WidthProvider } from 'react-grid-layout'
import EditInPlace from '../EditInPlace'
const ReactGridLayout = WidthProvider(RGL)
import { useState, useMemo, useEffect } from 'react'
import { mainMethodsPlanilha } from '../../utils/methodsPlanilha'
import _ from 'lodash'
import { useStoreActions } from 'easy-peasy'
import { MethodsStoreModel } from '../../../store/methodsStore'

// const { useState, useEffect } = React

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
  css?: string
}

interface I_Planilha {
  layouts: I_Layout[]
  onLayoutChange: (layout: I_Layout[]) => void
  config: {}
  isEditing: boolean
  onChangeCode: (code: string, index: number) => void
}

export default function Planilha({
  layouts,
  onLayoutChange,
  config,
  isEditing,
  onChangeCode,
}: I_Planilha) {
  const setLayout = useStoreActions<MethodsStoreModel>(
    actions => actions.setLayout
  )
  const { pegar, tryEval } = mainMethodsPlanilha({ layouts, setLayout })
  const [codesExec, setCodesExec] = useState<string[]>([])

  useEffect(() => {
    if (!isEditing) {
      const codes = layouts.map(layout => tryEval(layout.code || ''))
      setCodesExec(codes)
    }
  }, [isEditing])

  return (
    <div>
      <ReactGridLayout
        {...config}
        layout={layouts}
        compactType="No Compaction"
        onLayoutChange={l => {
          onLayoutChange(l.map((v, i) => ({ ...layouts[i], ...v })))
        }}
        // onDragStop={onLayoutChange}
        // onResizeStop={onLayoutChange}
        // allowOverlap={true}
      >
        {layouts.map((layout: I_Layout, index: number) => (
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
            {isEditing ? (
              <div style={{ display: 'flex' }}>
                <span>{layout.i}</span>
                <EditInPlace
                  breakLine={true}
                  colors={true}
                  value={layout.code || ''}
                  onChange={(value: string) => onChangeCode(value, index)}
                />
              </div>
            ) : (
              codesExec[index]
            )}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  )
}
