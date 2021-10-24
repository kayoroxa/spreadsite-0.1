import { useStoreActions, useStoreState } from 'easy-peasy'
import { useMemo, useState } from 'react'
import { MethodsStoreModel } from '../../../store/methodsStore'
import { I_LayoutPlanilha } from '../../utils/@types/TypesPlanilha'
import CellPlanilha from './CellPlanilha'
import ProviderCellsPlanilha from './ProviderCellsPlanilha'

export default function ComponentName() {
  const layouts = useStoreState<MethodsStoreModel>(state => state.layouts)
  const addLayout = useStoreActions<MethodsStoreModel>(
    actions => actions.addLayout
  )
  const setLayout = useStoreActions<MethodsStoreModel>(
    actions => actions.setLayout
  )

  const NewLayout: I_LayoutPlanilha = {
    code: '',
    css: '',
    i: '5',
    x: 0,
    y: 1,
    w: 1,
    h: 1,
    static: false,
  }
  console.log({ layouts })
  const [isEditing, setIsEditing] = useState(false)
  return (
    <>
      <button onClick={() => addLayout(NewLayout)}>Adicionar</button>
      <button onClick={() => setIsEditing(prev => !prev)}>
        {isEditing ? 'Editing' : 'not edition'}
      </button>
      <CellPlanilha dataGrid={layouts[0]} />
      <ul>
        {layouts.map((layout: I_LayoutPlanilha) => (
          <li key={layout.i}>
            {layout.i} - {layout.x} - {layout.y} - {layout.w} - {layout.h}
          </li>
        ))}
      </ul>
      {useMemo(
        () => (
          <ProviderCellsPlanilha
            layouts={layouts}
            onChange={setLayout}
            isEditing={isEditing}
          />
        ),
        [isEditing, layouts.length]
      )}
    </>
  )
}
