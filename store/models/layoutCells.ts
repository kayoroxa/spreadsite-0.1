import { Action, action, Thunk, thunk } from 'easy-peasy'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface LayoutCellsModel {}

const layoutCells: LayoutCellsModel = {}

export default layoutCells
