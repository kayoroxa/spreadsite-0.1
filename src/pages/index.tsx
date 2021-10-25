import { StoreProvider } from 'easy-peasy'
import store from '../../store/methodsStore'
import ProviderPlanilha from '../components/Phanilha-L/ProviderPlanilha'

export default function index() {
  return (
    <StoreProvider store={store}>
      <ProviderPlanilha />
    </StoreProvider>
  )
}
