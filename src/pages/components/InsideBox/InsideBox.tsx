import EditInPlace from '../EditInPlace'
import { useState, useEffect } from 'react'
import { tryEval } from '../../../utils/funcsForSheet'

interface Props {
  value: string
  onValueChange: (value: string) => void
}

InsideBox.defaultProps = {
  value: '',
  onValueChange: () => {},
}

export default function InsideBox({ value, onValueChange }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [is, setIs] = useState<'js' | 'html' | 'string' | false>(false)

  useEffect(() => {
    if (isEditing) setIs(false)
    else if (value.includes('<')) setIs('html')
    else if (value?.[0]?.includes('=')) setIs('js')
    else setIs('string')
  }, [value, isEditing])

  return (
    <div
      onClick={() => setIsEditing(true)}
      style={{ cursor: 'pointer', width: '300px' }}
    >
      {is === 'html' && <div dangerouslySetInnerHTML={{ __html: value }} />}
      {is === 'js' && <div>{tryEval(value || '')}</div>}
      {is === 'string' && <div>{value}</div>}
      <EditInPlace
        value={value}
        onChange={(value: string) => onValueChange(value)}
        breakLine={false}
        colors={true}
        isEditing={isEditing}
        onBlur={() => setIsEditing(false)}
        showDivResult={false}
      />
    </div>
  )
}
