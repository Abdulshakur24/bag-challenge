import React from 'react'
import ReactDOM from 'react-dom'
import App from './manifest/App'
import { Provider } from 'react-redux'
import store from './redux-app/store'
import Theme from './styles/Theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchCountries } from './redux-app/slicers/home'
import { fetchAllVisits } from './redux-app/slicers/visit'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

store.dispatch(fetchCountries())

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Router>
          <PersistGate persistor={persistor}>
            <ToastContainer />
            <App />
          </PersistGate>
        </Router>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
