import { StoreProvider } from 'easy-peasy'
import Planilha from '../components/Planilha-C'
import store from '../../store/methodsStore'

export default function OrganizadoEp() {
  return (
    <StoreProvider store={store}>
      <Planilha />
    </StoreProvider>
  )
}
