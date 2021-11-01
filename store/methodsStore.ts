import { action, createStore, Action, persist } from 'easy-peasy'
import { I_Code, I_Layout } from '../src/utils/@types/sheetTypes'

export interface MethodsStoreModel {
  layouts: I_Layout[]
  setLayout: Action<MethodsStoreModel, I_Layout[] | Function>
  addLayout: Action<MethodsStoreModel>
  resetLayout: Action<MethodsStoreModel>
  deleteCell: Action<MethodsStoreModel, number>

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
    addLayout: action(state => {
      const { layouts } = state
      const len = layouts.length
      const newLayout: I_Layout = {
        h: 10,
        i: len.toString(),
        moved: false,
        static: false,
        w: 10,
        x: layouts.length > 0 ? layouts[len - 1].x + layouts[len - 1].w : 1,
        y: 0,
        minH: 2.5,
        minW: 1.4,
      }
      state.codes.push({ js: '', html: '', css: '' })
      state.layouts.push(newLayout)
    }),
    resetLayout: action(state => {
      state.layouts = []
      state.codes = []
    }),
    deleteCell: action((state, payload) => {
      if (payload === state.layouts.length - 1) {
        state.layouts.pop()
        state.codes.pop()
      } else {
        state.layouts.splice(payload, 1)
        state.codes.splice(payload, 1)
      }
    }),
    codes: [],
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
