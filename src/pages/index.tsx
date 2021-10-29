import { StoreProvider, useStoreActions, useStoreState } from 'easy-peasy'
import store from '../../store/methodsStore'
import InCell from './components/InCell'
import MainCells from './components/MainCells'

export default function main() {
  return (
    <StoreProvider store={store}>
      <MainCells />
    </StoreProvider>
  )
}
