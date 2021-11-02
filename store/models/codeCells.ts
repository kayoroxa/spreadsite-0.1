import { Action, action, Thunk, thunk } from 'easy-peasy'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface CodeCellsModel {}

const codeCells: CodeCellsModel = {}

export default codeCells
