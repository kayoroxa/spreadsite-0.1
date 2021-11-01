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
  allowEdit: boolean
}

InsideBox.defaultProps = {
  value: { js: '', html: '', css: '' },
  onValueChange: () => {},
  modeLang: 'js',
}

const MainStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;
  * {
    width: 100%;
  }

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
  allowEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  // console.log({ id: value, printBrothers: printBrothers() })
  const showCode = !isEditing || !allowEdit
  return (
    <MainStyle
      className="InsideBox"
      onClick={() => setIsEditing(true)}
      style={{ cursor: allowEdit ? 'pointer' : 'default' }}
      cssInput={value.css}
    >
      {/* <div>{value.css}</div> */}

      {modeLang === 'html' && showCode && (
        <div dangerouslySetInnerHTML={{ __html: value.html }} />
      )}
      {modeLang === 'css' && showCode && <div>{value.css}</div>}
      {modeLang === 'js' && showCode && (
        <div style={{ width: '100%' }}>{tryEval(value.js || '')}</div>
      )}
      {isEditing && allowEdit && (
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
      )}
    </MainStyle>
  )
}
