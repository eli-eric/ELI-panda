import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducers from '../reducers'

const createBrowserHistory = require('history').createBrowserHistory
const history = createBrowserHistory()
const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history)
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(initialState?: AppState) {
  const middleware = [thunk, routerMiddleware(history)]

  const enhancers: any[] = []

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers))

  return store
}

export { history }

// export type AppState = ReturnType<typeof rootReducer>;
