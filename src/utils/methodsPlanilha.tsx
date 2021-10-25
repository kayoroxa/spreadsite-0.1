import { useStoreActions, useStoreState } from 'easy-peasy'
import _ from 'lodash'
import { MethodsStoreModel } from '../../store/methodsStore'
import { I_Layout } from '../components/Phanilha-L/Planilha'

export function mainMethodsPlanilha({ layouts, setLayout }: any) {
  // const layouts: I_Layout[] | [] = useStoreState<MethodsStoreModel>(
  //   state => state.layouts
  // )
  // const addLayout = useStoreActions<MethodsStoreModel>(
  //   actions => actions.addLayout
  // )
  // const setLayout = useStoreActions<MethodsStoreModel>(
  //   actions => actions.setLayout
  // )
  function tryEval(code: string | undefined): any {
    try {
      if (!code || typeof code !== 'string') return ''
      const haveReturn = code.includes('return')
      const haveAwait = code.includes('await')
      if (haveAwait) {
        return eval(`(async () => {${code}})()`)
      } else if (haveReturn) {
        try {
          return eval(`(() => {${code}})()`)
        } catch (error) {
          return 'error: ' + error
        }
      } else {
        return eval(code)
      }
    } catch (e) {
      return 'error: ' + e
    }
  }
  function pegar(id: number) {
    const celula = _.find(layouts, { i: id.toString() })

    if (celula) {
      return {
        set: {
          code: (value: any) => {
            setLayout((prev: I_Layout[]) => {
              const newLayout = _.cloneDeep(prev)
              const index = _.findIndex(newLayout, { i: id.toString() })
              newLayout[index].code = value
              return newLayout
            })
          },
        },
        get: {
          code: () => celula.code,
          css: () => celula.css,
          result: () => {
            if (!celula.code) return ''
            const haveReturn = celula.code?.includes('return')
            const codeSemOnClick =
              celula.code?.replace(/onClick\(.*\)\;*/g, '') || ''

            if (haveReturn) return eval(`(() => {${codeSemOnClick}})()`)
            else return eval(codeSemOnClick)
          },
        },
      }
    } else return ''
  }

  return {
    pegar,
    tryEval,
  }
}
