import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRoutes from './Routes'
import store from './redux/store'
import '@utils/i18n/i18n.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
)
