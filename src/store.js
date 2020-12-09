
/* Store
 * ======= */

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'

import { rootReducer } from './reducers'

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
  )
)

export const unsubscribe = store.subscribe(
  () => console.log('state', store.getState()))

window.store = store;
