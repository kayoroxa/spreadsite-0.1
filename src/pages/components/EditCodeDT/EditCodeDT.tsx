import { ContainerEditCodeDT } from './styles-edit-code-dt'
import {
  Dispatch,
  SetStateAction,
} from 'hoist-non-react-statics/node_modules/@types/react'

interface IProps {
  setMode: Dispatch<SetStateAction<'js' | 'html' | 'css'>>
  children: React.ReactNode
  close: () => any
}
const EditCodeDT = ({ setMode, children, close }: IProps) => {
  return (
    <ContainerEditCodeDT>
      <div className="head">
        <button onClick={() => setMode('js')}>js</button>
        <button onClick={() => setMode('html')}>html</button>
        <button onClick={() => setMode('css')}>css</button>
        <button onClick={() => close()} className="red">
          Close
        </button>
      </div>
      <main>{children}</main>
    </ContainerEditCodeDT>
  )
}

export default EditCodeDT
