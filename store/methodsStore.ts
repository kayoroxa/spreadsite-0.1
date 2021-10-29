import { action, createStore, Action, persist } from 'easy-peasy'
import { I_Code, I_Layout } from '../src/utils/@types/sheetTypes'

export interface MethodsStoreModel {
  layouts: I_Layout[]
  setLayout: Action<MethodsStoreModel, I_Layout[] | Function>
  addLayout: Action<MethodsStoreModel, I_Layout>

  codes: I_Code[]
  setCodes: Action<MethodsStoreModel, I_Code[] | Function>
  mode: 'js' | 'html' | 'css'
  setMode: Action<MethodsStoreModel, 'js' | 'html' | 'css' | Function>

  isEditing: boolean
  setIsEditing: Action<MethodsStoreModel, boolean | Function>
}

const store = createStore<MethodsStoreModel>(
  persist({
    layouts: [],
    setLayout: action((state, payload) => {
      if (typeof payload === 'function') {
        state.layouts = payload(state.layouts)
      } else {
        state.layouts = payload
      }
    }),
    addLayout: action((state, payload) => {
      state.layouts.push(payload)
    }),

    codes: [
      { js: '', html: '', css: '' },
      { js: '', html: '', css: '' },
      { js: '', html: '', css: '' },
    ],
    setCodes: action((state, payload) => {
      if (typeof payload === 'function') {
        state.codes = payload(state.codes)
      } else {
        state.codes = payload
      }

      // console.log({ payload, value: payload(state.codes) })
      // state.codes = [{ js: '', html: 'asdasd', css: 'asdasd' }]
    }),
    mode: 'js',
    setMode: action((state, payload) => {
      if (typeof payload === 'function') {
        state.codes = payload(state.mode)
      } else {
        state.mode = payload
      }
    }),
    isEditing: true,
    setIsEditing: action((state, payload) => {
      if (typeof payload === 'function') {
        state.codes = payload(state.isEditing)
      } else {
        state.isEditing = payload
      }
    }),
  })
)

export default store
