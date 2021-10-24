import { useState } from 'react'
import { I_LayoutPlanilha } from '../../utils/@types/TypesPlanilha'
import EditInPlace from '../EditInPlace'
import _ from 'lodash'

interface Props {
  dataGrid: I_LayoutPlanilha
}

export default function CellPlanilha({ dataGrid }: Props) {
  // const { code, css, i, x, y, w, h, static: isStatic } = dataGrid
  const { i, code } = dataGrid
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div key={i.toString()} data-grid={dataGrid}>
      <span className="text">
        {isEditing ? (
          <EditInPlace
            breakLine={true}
            colors={true}
            value={dataGrid.code || ''}
            onChange={(value: string) => {
              const newLayout = _.cloneDeep(dataGrid)
              dataGrid.code = value
              // setLayout(newLayout)
            }}
          />
        ) : (
          code
        )}
      </span>
    </div>
  )
}
