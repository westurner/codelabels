
/* Reducers
 * ======== */  
import {
    PROJECT_SELECTED,
    PROJECT_LABELS_INVALIDATE,
    PROJECT_LABELS_RECEIVE,
    PROJECT_LABELS_REQUEST,
    RepoServices
} from './actions'

import { combineReducers } from 'redux'

export const initialState = {
  projectSelected: {},
  labelsByProject: {}
}

export function projectSelected(state = {}, action) {
  switch (action.type) {
    case PROJECT_SELECTED:
      const obj = {}
      obj[action.namespace] = action.project.id
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

export function labels(state = {}, action) {
  switch (action.type) {
    case PROJECT_LABELS_INVALIDATE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case PROJECT_LABELS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        service: action.project.service,
        id: action.project.id,
        namespace: action.namespace
      })
    case PROJECT_LABELS_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        labels: action.labels,
        lastUpdated: action.receivedAt,
        namespace: action.namespace
      })

    default:
      return state
  }

  return state
}

function insertAtFront(item, ary) {
  const index = ary.indexOf(item)
  if (index === -1) {
    return [item, ...ary]
  } else if (index === 0) {
    return [...ary]
  } else {
    return [item, ...ary.slice(0,index), ...ary.slice(index+1)]
  }
}

export function labelsByProject(state = {}, action) {
  switch (action.type) {
    case PROJECT_LABELS_INVALIDATE:
    case PROJECT_LABELS_RECEIVE:
    case PROJECT_LABELS_REQUEST:
      console.log("ACTION", action)
      return Object.assign({}, state, {
        _keys: insertAtFront(action.project.id, state._keys || []),
        [action.project.id]: labels(
            state[action.project.id], action)
        // TODO: we need a better natural key per repo OR
        // id should be the full URL of the repo
      })
    default:
      return state
  }

}

export const rootReducer = combineReducers({
  labelsByProject,
  projectSelected,
})