import GridLayout from 'react-grid-layout'
import { I_LayoutPlanilha } from '../../utils/@types/TypesPlanilha'
// import CellPlanilha from './CellPlanilha'
import _ from 'lodash'
import { useState } from 'react'
import EditInPlace from '../EditInPlace'

export default function ProviderCellsPlanilha({
  layouts,
  onChange,
  isEditing,
}: {
  layouts: I_LayoutPlanilha[]
  onChange: (data: I_LayoutPlanilha[]) => void
  isEditing: boolean
}) {
  console.log({ layouts })
  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={30}
      width={1200}
      compactType="No Compaction"
      onLayoutChange={(layout: I_LayoutPlanilha[]) => {
        onChange(layout)
      }}
    >
      {layouts.map((layout: I_LayoutPlanilha) => (
        <div key={layout.i} data-grid={layout}>
          <span className="text">
            {isEditing ? (
              <EditInPlace
                breakLine={true}
                colors={true}
                value={layout.code || ''}
                onChange={(value: string) => {
                  const newLayout = _.cloneDeep(layout)
                  layout.code = value
                  // setLayout(newLayout)
                }}
              />
            ) : (
              layout.code
            )}
          </span>
        </div>
      ))}
    </GridLayout>
  )
}
