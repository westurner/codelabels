
import { Component } from 'preact'

import Octokit from '@octokit/rest'

export default class GitHubService extends Component {
  constructor() {
    super();
    this.octokit = this.buildOctokit();
  }

  buildOctokit() {
    let octokit = new Octokit({
      auth: undefined,
      userAgent: 'octokit/rest.js v1.2.3',
    });
    return octokit;
  }

  parseUrl(url) {
    let e = document.createElement('a')
    e.href = url
    let [owner, repo, ...rest] = e.pathname.slice(1).split('/')
    return {owner: owner, repo: repo}
  }

  async getLabels(url) {
    console.log(url)
    let {owner, repo} = this.parseUrl(url)
    try {
      let response = await this.octokit.issues.listLabelsForRepo({
        owner: owner,
        repo: repo
      })
      console.log(response)
      let {data} = response
      console.log('data', data)
      return data.map(({color, name, url}) => {
        return {color: '#'+color, name, url}
      })
    } catch(e) {
      console.error('error', e)
    }
  }
}