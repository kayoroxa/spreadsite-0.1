import GridLayout from 'react-grid-layout'
import _ from 'lodash'
import { useState } from 'react'
import { I_Code } from '../../../utils/@types/sheetTypes'
import InCell from '../InCell'

export default function MainCells() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 11, h: 7, static: true },
    { i: 'b', x: 1, y: 0, w: 11, h: 7, static: true },
    { i: 'c', x: 4, y: 0, w: 11, h: 7, static: true },
  ]
  const [allowEdit, setAllowEdit] = useState(false)
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

  return (
    <div>
      <p>{mode}</p>
      <p>{JSON.stringify(allValues)}</p>
      <button onClick={() => setAllowEdit(!allowEdit)}>
        {allowEdit ? 'allowEdit' : 'not allowEdit'}
      </button>
      <button onClick={() => setMode('js')}>js</button>
      <button onClick={() => setMode('html')}>html</button>
      <button onClick={() => setMode('css')}>css</button>
      <GridLayout
        className="layout"
        compactType={null}
        layout={layout}
        cols={80}
        rowHeight={2}
        width={1200}
      >
        <div key="a">
          <InCell
            allValues={allValues}
            setAllValues={setAllValues}
            index={0}
            mode={mode}
            allowEdit={allowEdit}
          />
        </div>
        <div key="b">
          <InCell
            allValues={allValues}
            setAllValues={setAllValues}
            index={1}
            mode={mode}
            allowEdit={allowEdit}
          />
        </div>
        <div key="c">
          <InCell
            allValues={allValues}
            setAllValues={setAllValues}
            index={2}
            mode={mode}
            allowEdit={allowEdit}
          />
        </div>
      </GridLayout>
    </div>
  )
}
