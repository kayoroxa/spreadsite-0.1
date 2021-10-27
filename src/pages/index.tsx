import styled from 'styled-components'
import InsideBox from './components/InsideBox/InsideBox'
import { useState } from 'react'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  const [value, setValue] = useState('asd')
  return <InsideBox value={value} onValueChange={setValue} />
}
