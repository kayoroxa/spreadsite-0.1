import GridLayout from 'react-grid-layout'
import _ from 'lodash'
import { useState } from 'react'
import { I_Code } from '../../../utils/@types/sheetTypes'
import InCell from '../InCell'
import EditCodeDT from '../EditCodeDT'
import EditInPlace from '../EditInPlace'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { MethodsStoreModel } from '../../../../store/methodsStore'
import { useLayoutEffect } from 'react'
import useWindowSize from '../../../utils/useWindowSize'

const codeInit = {
  js: '',
  html: '',
  css: '',
}

export default function MainCells() {
  const [width, height] = useWindowSize()
  const { codes, isEditing } = useStoreState<MethodsStoreModel>(state => state)
  const { setCodes, setIsEditing } = useStoreActions<MethodsStoreModel>(
    actions => actions
  )

  const layout = [
    { i: 'a', x: 0, y: 0, w: 11, h: 7 },
    { i: 'b', x: 1, y: 0, w: 11, h: 7 },
    { i: 'c', x: 4, y: 0, w: 11, h: 7 },
  ]
  const [allowEdit, setAllowEdit] = useState(true)
  const [mode, setMode] = useState<'js' | 'html' | 'css'>('js')

  const [allValues, setAllValues] = useState<I_Code[]>([
    {
      js: '',
      html: '',
      css: '',
    },
    {
      js: '',
      html: '',
      css: '',
    },
  ])
  const [lastCLickIndex, setLastClickIndex] = useState<number | null>(null)
  return (
    <div>
      {/* <p>{JSON.stringify(allValues)}</p> */}
      <p>{JSON.stringify(codes)}</p>

      <button onClick={() => setAllowEdit(!allowEdit)}>
        {allowEdit ? 'allowEdit' : 'not allowEdit'}
      </button>
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
        layout={layout}
        cols={80}
        rowHeight={2}
        width={width}
      >
        <div
          key="a"
          onClick={() => setLastClickIndex(0)}
          className={lastCLickIndex === 0 && allowEdit ? 'contorno' : ''}
        >
          <InCell
            allValues={codes}
            setAllValues={setCodes}
            index={0}
            mode={mode}
            allowEdit={false}
            showIndex={lastCLickIndex !== null && allowEdit ? true : false}
          />
        </div>
        <div
          key="b"
          onClick={() => setLastClickIndex(1)}
          className={lastCLickIndex === 1 && allowEdit ? 'contorno' : ''}
        >
          <InCell
            allValues={codes}
            setAllValues={setCodes}
            index={1}
            mode={mode}
            allowEdit={false}
            showIndex={lastCLickIndex !== null && allowEdit ? true : false}
          />
        </div>
        <div
          key="c"
          onClick={() => setLastClickIndex(2)}
          className={lastCLickIndex === 2 && allowEdit ? 'contorno' : ''}
        >
          <InCell
            allValues={codes}
            setAllValues={setCodes}
            index={2}
            mode={mode}
            allowEdit={false}
            showIndex={lastCLickIndex !== null && allowEdit ? true : false}
          />
        </div>
      </GridLayout>
    </div>
  )
}
