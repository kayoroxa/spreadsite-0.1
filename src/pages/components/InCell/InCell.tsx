import styled from 'styled-components'
import { useState } from 'react'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
import _ from 'lodash'
import { useMemo } from 'react'
import { I_Code } from '../../../utils/@types/sheetTypes'
import { mainMethodsPlanilha } from '../../../utils/funcsForSheet'
import InsideBox from '../InsideBox/InsideBox'
import {
  Dispatch,
  SetStateAction,
} from 'hoist-non-react-statics/node_modules/@types/react'

interface IProps {
  allValues: I_Code[]
  setAllValues: Dispatch<SetStateAction<I_Code[]>>
  index: number
  mode: 'js' | 'html' | 'css'
  allowEdit: boolean
}

type ValuesFunc = (prev: I_Code) => I_Code

export default function InCell({
  allValues,
  setAllValues,
  index,
  mode,
  allowEdit,
}: IProps) {
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

  const { tryEval } = mainMethodsPlanilha(allValues, setAllValues)

  return (
    <>
      {allowEdit && (
        <span
          style={{
            position: 'absolute',
            background: 'gray',
            opacity: '0.2',
            borderRadius: '5px',
          }}
        >
          {index}
        </span>
      )}

      <InsideBox
        value={allValues[index]}
        onValueChange={valueFunc => handleSetAllValues(index, valueFunc)}
        modeLang={mode}
        printBrothers={() => allValues}
        tryEval={tryEval}
        allowEdit={allowEdit}
      />
    </>
  )
}
