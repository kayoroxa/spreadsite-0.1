import { useEffect, useMemo, useRef, useState } from 'react'

import { ContainerEditInPlace } from './styles-edit-in-place'

interface IProps {
  value: string
  onChange: Function
  breakLine?: boolean
  colors?: boolean
}
const EditInPlace = ({ value, onChange, breakLine, colors }: IProps) => {
  const done = (self: any) => {
    setShortsOn(true)

    onChange(
      inputRef?.current?.textContent !== ''
        ? inputRef?.current?.textContent
        : ''
    )
    self.target.innerHTML = innerHtml
  }
  const inputRef = useRef<HTMLInputElement>(null)

  const [blurInput, setBlurInput] = useState(true)
  const [shortsOn, setShortsOn] = useState(true)
  // const { setShortsOn, setBlurInput } = useStoreActions(actions => actions)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur()
      setBlurInput(false)
    }
  }, [blurInput])

  const innerHtml = useMemo(() => {
    if (!breakLine) {
      if (!colors) return value
      return 'subtitleToInner(value)'
    } else {
      // const colorValue = value
      if (typeof value !== 'string') {
        return value
      }
      return value.replace(/,\s|,/g, ',<br />')
    }
  }, [value])

  return (
    <ContainerEditInPlace>
      <span
        style={{
          backgroundColor: '#f5f5f5',
        }}
        dangerouslySetInnerHTML={{ __html: innerHtml ? innerHtml : '' }}
        suppressContentEditableWarning={true}
        className="textArea"
        onBlur={self => {
          done(self)
        }}
        contentEditable
        ref={inputRef}
        onFocus={self => {
          self.target.innerHTML = value
          setShortsOn(false)
        }}
      />
    </ContainerEditInPlace>
  )
}

export default EditInPlace
