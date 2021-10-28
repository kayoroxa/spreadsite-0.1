import styled from 'styled-components'
import InsideBox from './components/InsideBox/InsideBox'
import { useState } from 'react'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
import _ from 'lodash'
import { I_Code } from '../utils/@types/sheetTypes'
import { useMemo } from 'react'
import { mainMethodsPlanilha } from '../utils/funcsForSheet'

type ValuesFunc = (prev: I_Code) => I_Code
export default function Home() {
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

  function handleSetAllValues(index: number, valuesFunc: ValuesFunc) {
    setAllValues(prev => {
      const newValues = [...prev]
      newValues[index] = valuesFunc(prev[index])
      return newValues
    })
  }
  const [value, setValue] = useState<{ js: ''; html: ''; css: '' }>({
    js: '',
    html: '',
    css: '',
  })
  const [mode, setMode] = useState<'js' | 'html' | 'css'>('js')

  const { tryEval } = mainMethodsPlanilha(allValues, setAllValues)

  return (
    <div>
      <p>{mode}</p>
      <p>{JSON.stringify(allValues)}</p>
      <button onClick={() => setMode('js')}>js</button>
      <button onClick={() => setMode('html')}>html</button>
      <button onClick={() => setMode('css')}>css</button>

      <InsideBox
        value={allValues[0]}
        onValueChange={valueFunc => handleSetAllValues(0, valueFunc)}
        modeLang={mode}
        printBrothers={() => allValues}
        tryEval={tryEval}
      />
      <InsideBox
        value={allValues[1]}
        onValueChange={valueFunc => handleSetAllValues(1, valueFunc)}
        modeLang={mode}
        printBrothers={() => allValues}
        tryEval={tryEval}
      />
    </div>
  )
}
