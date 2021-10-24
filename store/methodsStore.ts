import { I_LayoutPlanilha } from './../src/utils/@types/TypesPlanilha'
import { action, createStore, Action, persist } from 'easy-peasy'

export interface MethodsStoreModel {
  layouts: I_LayoutPlanilha[]
  setLayout: Action<MethodsStoreModel, I_LayoutPlanilha[]>
  addLayout: Action<MethodsStoreModel, I_LayoutPlanilha>
}

const store = createStore<MethodsStoreModel>(
  persist({
    layouts: [
      { code: '5+2', css: '', i: '1', x: 0, y: 0, w: 1, h: 2, static: true },
      {
        code: `4+5`,
        css: '',
        i: '2',
        x: 1,
        y: 0,
        w: 3,
        h: 2,
      },
      {
        code: `onClick(() => pegar(1).set.code('1+1')); return "1+1"`,
        css: '',
        i: '3',
        x: 4,
        y: 0,
        w: 1,
        h: 2,
      },
      {
        code: `onClick(() => pegar(1).set.code('5+5')); return "5+5"`,
        css: '',
        i: '4',
        x: 4,
        y: 1,
        w: 1,
        h: 2,
      },
    ],
    setLayout: action((state, payload) => {
      state.layouts = payload
    }),
    addLayout: action((state, payload) => {
      state.layouts.push(payload)
    }),
  })
)

export default store
