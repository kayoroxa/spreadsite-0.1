import { I_Layout } from './../src/components/Phanilha-L/Planilha'
import { action, createStore, Action, persist } from 'easy-peasy'

export interface MethodsStoreModel {
  layouts: I_Layout[]
  setLayout: Action<MethodsStoreModel, I_Layout[] | Function>
  addLayout: Action<MethodsStoreModel, I_Layout>
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
  })
)

export default store
