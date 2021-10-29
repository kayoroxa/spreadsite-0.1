import { I_Code } from '../src/utils/@types/sheetTypes'
import { Action, action, createContextStore } from 'easy-peasy'

export interface MethodsStoreModel {
  codes: I_Code[]
  setCodes: Action<MethodsStoreModel, I_Code[] | Function>
  mode: 'js' | 'html' | 'css'
  setMode: Action<MethodsStoreModel, 'js' | 'html' | 'css' | Function>
}

const CounterStore = createContextStore<MethodsStoreModel>({
  codes: [],
  setCodes: action((state, payload) => {
    if (typeof payload === 'function') {
      payload(state.codes)
    } else {
      state.codes = payload
    }
  }),
  mode: 'js',
  setMode: action((state, payload) => {
    if (typeof payload === 'function') {
      payload(state.mode)
    } else {
      state.mode = payload
    }
  }),
})

export default CounterStore
