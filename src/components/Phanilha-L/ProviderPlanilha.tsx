import { useStoreActions, useStoreState } from 'easy-peasy'
import React, { useState, useEffect, useMemo } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { MethodsStoreModel } from '../../../store/methodsStore'

import Planilha, { I_Layout } from './Planilha'
const ReactGridLayout = WidthProvider(RGL)

ProviderPlanilha.defaultProps = {
  className: 'layout',
  cols: 80,
  rowHeight: 2,
}

export default function ProviderPlanilha(props: any) {
  const layouts: I_Layout[] | [] = useStoreState<MethodsStoreModel>(
    state => state.layouts
  )
  const addLayout = useStoreActions<MethodsStoreModel>(
    actions => actions.addLayout
  )
  const setLayout = useStoreActions<MethodsStoreModel>(
    actions => actions.setLayout
  )

  const [isEditing, setIsEditing] = useState(false)
  // const [layouts, setLayouts] = useState<I_Layout[] | [] | any>([])

  function resetLayout() {
    setLayout([])
  }

  // useEffect(() => {
  //   setLayouts(loadLocalStorage())
  // }, [])

  function onLayoutChange(layout: I_Layout[]) {
    /*eslint no-console: 0*/
    setLayout(layout)
  }

  function handleAddLayout() {
    setIsEditing(true)
    const len = layouts.length
    const newLayout: I_Layout = {
      h: 3,
      i: len.toString(),
      moved: false,
      static: false,
      w: 4,
      x: layouts.length > 0 ? layouts[len - 1].x + layouts[len - 1].w : 1,
      y: 0,
      minH: 2.5,
      minW: 2.5,
    }
    addLayout(newLayout)
  }

  function handleChangeCode(code: string, index: number) {
    const newLayouts = [...layouts]
    newLayouts[index].code = code
    setLayout(newLayouts)
  }

  useEffect(() => {
    if (isEditing) {
      setLayout((prev: I_Layout[]) =>
        prev.map(layout => ({ ...layout, static: false }))
      )
    } else {
      setLayout((prev: I_Layout[]) =>
        prev.map(layout => ({ ...layout, static: true }))
      )
    }
  }, [isEditing])

  return (
    <div>
      <div>{JSON.stringify(layouts)}</div>
      <button onClick={() => handleAddLayout()}>Add layout</button>
      <button onClick={resetLayout}>Reset Layout</button>
      <button onClick={() => setIsEditing(prev => !prev)}>
        {isEditing ? 'Stop Editing' : 'Start Editing'}
      </button>
      {useMemo(
        () =>
          layouts.length > 0 && layouts[0].h ? (
            <Planilha
              onChangeCode={handleChangeCode}
              isEditing={isEditing}
              onLayoutChange={onLayoutChange}
              layouts={layouts}
              config={props}
            />
          ) : (
            <div>Vazio</div>
          ),
        [isEditing, layouts]
      )}
    </div>
  )
}

// function saveLocalStorage(layout: I_Layout[] | []) {
//   if (layout.length === 0) return
//   if (global.localStorage) {
//     global.localStorage.setItem('rgl-7', JSON.stringify(layout))
//   }
// }

// function loadLocalStorage() {
//   if (global.localStorage) {
//     return JSON.parse(global.localStorage.getItem('rgl-7') || '[]')
//   }
// }
