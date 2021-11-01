import GridLayout from 'react-grid-layout'
import _ from 'lodash'
import { useState } from 'react'
import { I_Code, I_Layout } from '../../../utils/@types/sheetTypes'
import InCell from '../InCell'
import EditCodeDT from '../EditCodeDT'
import EditInPlace from '../EditInPlace'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { MethodsStoreModel } from '../../../../store/methodsStore'
import { useLayoutEffect, useEffect } from 'react'
import useWindowSize from '../../../utils/useWindowSize'

export default function MainCells() {
  const [width, height] = useWindowSize()
  const { codes, isEditing, layouts } = useStoreState<MethodsStoreModel>(
    state => state
  )
  const [localLayouts, setLocalLayouts] = useState<I_Layout[]>([])
  const { setCodes, setIsEditing, setLayout } =
    useStoreActions<MethodsStoreModel>(actions => actions)

  const [allowEdit, setAllowEdit] = useState(true)
  const [mode, setMode] = useState<'js' | 'html' | 'css'>('js')

  const [lastCLickIndex, setLastClickIndex] = useState<number | null>(null)

  useEffect(() => {
    setLocalLayouts(layouts)
  }, [layouts])

  useEffect(() => {
    if (localLayouts.length > 0) setLayout(localLayouts)
  }, [localLayouts])

  return (
    <div>
      <p>{JSON.stringify(localLayouts)}</p>
      {/* <p>{JSON.stringify(codes)}</p> */}

      {lastCLickIndex !== null && allowEdit && (
        <EditCodeDT
          setMode={setMode}
          close={() => setLastClickIndex(null)}
          mode={mode}
        >
          <textarea
            className="code-input"
            // onBlur={() => setLastClickIndex(null)}
            onChange={e =>
              setCodes((prev: I_Code[]) => {
                const newCodes = _.cloneDeep(prev)
                newCodes[lastCLickIndex][mode] = e.target.value
                // console.log({ newCodes })
                return newCodes
              })
            }
            value={codes[lastCLickIndex][mode]}
          />
        </EditCodeDT>
      )}

      <GridLayout
        className="layout"
        compactType={null}
        layout={layouts}
        cols={80}
        rowHeight={2}
        width={width}
        onLayoutChange={(layout: I_Layout[]) => {
          setLocalLayouts(layout)
        }}
      >
        {localLayouts.map((layout, index) => {
          return (
            <div
              key={layout.i}
              onClick={() => setLastClickIndex(index)}
              className={
                lastCLickIndex === index && allowEdit ? 'contorno' : ''
              }
              data-grid={layout}
            >
              <InCell
                allValues={codes}
                setAllValues={setCodes}
                index={index}
                mode={mode}
                allowEdit={false}
                showIndex={lastCLickIndex !== null && allowEdit ? true : false}
              />
            </div>
          )
        })}
      </GridLayout>

      <button
        onClick={() => setAllowEdit(!allowEdit)}
        style={{ position: 'fixed', bottom: '0px' }}
      >
        {allowEdit ? 'allowEdit' : 'not allowEdit'}
      </button>
      {/* <button
        onClick={() => setAllowEdit(!allowEdit)}
        style={{ position: 'fixed', bottom: '0px', left: '50px' }}
      >
        {allowEdit ? 'allowEdit' : 'not allowEdit'}
      </button> */}
    </div>
  )
}
