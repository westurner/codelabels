
// TODO FIXME XXX: remove hardcoded token

import { Component } from 'preact'

import Gitlab from 'gitlab'

export default class GitLabService extends Component {
  constructor() {
    super();
    this.api = this.buildGitlab();
  }

  buildGitlab() {
    return new Gitlab({
      url: 'https://gitlab.com',
      token: 'BPmqZVLS5Pzxy-tpodL8',
      //oauthToken:
      //jobToken:
      useXMLHttpRequest: true // for browser support
    })
  }

  parseUrl(url) {
    let e = document.createElement('a')
    e.href = url
    let projectId = e.pathname.slice(1)
    return {projectId}
  }

  async getLabels(url) {
    try {
      let {projectId} = this.parseUrl(url)
      let _labels = await this.api.Labels.all(projectId);
      let labels = _labels.map(
        ({name, color, text_color, description,
          priority, is_project_label}) => {
          return {name, color, text_color, description,
            priority, is_project_label}
        });
      return labels;
    } catch (e) {
      console.log('error', e);
    }
  }
}