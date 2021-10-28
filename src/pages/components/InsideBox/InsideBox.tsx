import EditInPlace from '../EditInPlace'
import { useState, useEffect } from 'react'
// import { tryEval } from '../../../utils/funcsForSheet'
import styled from 'styled-components'
import { I_Code } from '../../../utils/@types/sheetTypes'

interface ObjLang {
  js: ''
  html: ''
  css: ''
}
interface Props {
  value: ObjLang
  onValueChange: (callBack: (prev: ObjLang) => I_Code) => void
  modeLang: 'js' | 'html' | 'css'
  printBrothers: Function
  tryEval: Function
}

InsideBox.defaultProps = {
  value: { js: '', html: '', css: '' },
  onValueChange: () => {},
  modeLang: 'js',
}

const MainStyle = styled.div`
  cursor: pointer;
  width: 300px;
  /* border: 1px solid black; */
  /* border-radius: 5px; */
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  margin: 20px;
  background: lightcyan;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ cssInput }) => {
    return cssInput
  }};
`

export default function InsideBox({
  value,
  onValueChange,
  modeLang,
  printBrothers,
  tryEval,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  // console.log({ id: value, printBrothers: printBrothers() })
  return (
    <MainStyle
      onClick={() => setIsEditing(true)}
      // style={{ cursor: 'pointer', width: '300px', border: '1px solid black' }}
      cssInput={value.css}
    >
      {/* <div>{value.css}</div> */}
      {modeLang === 'html' && !isEditing && (
        <div dangerouslySetInnerHTML={{ __html: value.html }} />
      )}
      {modeLang === 'css' && !isEditing && <div>{value.css}</div>}
      {modeLang === 'js' && !isEditing && <div>{tryEval(value.js || '')}</div>}
      <EditInPlace
        value={value[modeLang]}
        onChange={(value: ObjLang) =>
          onValueChange((prev: ObjLang) => ({ ...prev, [modeLang]: value }))
        }
        breakLine={false}
        colors={true}
        isEditing={isEditing}
        onBlur={() => setIsEditing(false)}
        showDivResult={false}
      />
    </MainStyle>
  )
}
