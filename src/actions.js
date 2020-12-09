/* Actions
 * ======== */

import GitHubService from './components/GitHubService'
import GitLabService from './components/GitLabService'

/* action types */
export const PROJECT_SELECTED = 'PROJECT_SELECTED'
export const PROJECT_LABELS_INVALIDATE = 'PROJECT_LABELS_INVALIDATE'
export const PROJECT_LABELS_REQUEST = 'PROJECT_LABELS_REQUEST'
export const PROJECT_LABELS_RECEIVE = 'PROJECT_LABELS_RECEIVE'

export const CONFIG_SAVE = 'CONFIG_SAVE'
export const CONFIG_SAVE_DONE = 'CONFIG_SAVE_DONE'
export const CONFIG_SAVE_ERROR = 'CONFIG_SAVE_ERROR' // TODO TODO TODO FIXME XXX


/* action constants */
export const RepoServices = {
  GITHUB: 'github',
  GITLAB: 'gitlab'
}

/* action creators
 */

export function selectProject(project, namespace) {
  return {
    type: PROJECT_SELECTED,
    project,
    namespace
  }
}

export function getProjectLabels(project, namespace) {
  return {
    type: PROJECT_LABELS_INVALIDATE,
    project,
    namespace
  }
}

export function requestProjectLabels(project, namespace) {
  return {
    type: PROJECT_LABELS_REQUEST,
    project,
    namespace
  }
}

export function receiveProjectLabels(project, namespace, json) {
  return {
    type: PROJECT_LABELS_RECEIVE,
    project,
    namespace,
    labels: json,
    receivedAt: Date.now()
  }
}


export function saveConfig(config) {
  return {
    type: CONFIG_SAVE,
    config
  }
}

export function doneSavingConfig() {
  return {
    type: CONFIG_SAVE_DONE,
    config
  }
}

export function errorSavingConfig() {
  return {
    type: CONFIG_SAVE_ERROR,
    config
  }
}

/* action thunks
 */
export function fetchLabels(project, namespace) {
  return function(dispatch) {
    dispatch(requestProjectLabels(project))
    let api
    switch (project.service) {
      case RepoServices.GITHUB:
        api = new GitHubService()
        // TODO: url.parse(project.id).path.split("/")[:2]
        return api.getLabels(project.id).then(
          response => response,
          error => console.log("An error ocurred", error)
        ).then(
          json => {
            dispatch(
              receiveProjectLabels(project, namespace, json))
            console.log(json)
          }
        )
      case RepoServices.GITLAB:
        api = new GitLabService()
        return api.getLabels(project.id).then(
          response => response,
          error => console.log("An error ocurred", error)
        ).then(
          json => dispatch(
            receiveProjectLabels(project, namespace, json))
        )
      default:
        // TODO: this validation should be in a different step
        console.log("RepoService unknown:", project.service)
        throw "RepoService unknown: " + project.service
      }
  }
}

export function shouldFetchLabels(state, project) {
  const labels = state.labelsByProject[project.id] // TODO
  if (!labels) {
    return true
  } else if (project.isFetching) {
    return false
  } else {
    return labels.didInvalidate
  }
}

export function FetchLabelsIfNeeded(project) {
  return (dispatch, getState) => {
    if (shouldFetchLabels(getState(), project)) {
      return dispatch(fetchLabels(project))
    } else {
      return Promise.resolve()
    }
  }
}
