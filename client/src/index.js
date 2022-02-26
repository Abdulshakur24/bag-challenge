import React from 'react'
import ReactDOM from 'react-dom'
import App from './manifest/App'
import { Provider } from 'react-redux'
import store from './redux-app/store'
import Theme from './styles/Theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchCountries } from './redux-app/slicers/toVisit'
store.dispatch(fetchCountries())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Router>
          <ToastContainer />
          <App />
        </Router>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
