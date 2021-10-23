import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import ShowcaseLayout from '../components/Planilha'

export default function ExampleLayout() {
  const [state, setState] = useState({ layout: [] })
  const [fixed, setFixed] = useState(false)


  function onLayoutChange(layout) {
    setState({ layout: layout })
  }

  function stringifyLayout() {
    return state.layout.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      )
    })
  }

  return (
    <div>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
        <div>{JSON.stringify(fixed)}</div>
      </div>
      <button onClick={() => setFixed(prev => !prev)}>Static</button>
      <ShowcaseLayout fixed={fixed} onLayoutChange={onLayoutChange} />
    </div>
  )
}

