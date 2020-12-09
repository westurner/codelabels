
import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { saveConfig } from '../actions'

@connect()
export default class Config extends Component {

  constructor(props) {
    super(props)
    this.state = {
      githubToken: props.githubToken,
      gitlabToken: props.gitlabToken
    }
  }

  handleSetGitlabToken(token) {
    this.setState({'gitlabToken': token})
  }
  handleSetGithubToken(token) {
    this.setState({'githubToken': token})
  }

  getConfig() {
    return this.state
  }

  handleSaveConfig() {
    this.props.dispatch(saveConfig())
  }

  render() {
    return <div class="container">
      <h1>Config</h1>

      <div class="form-group">
        <h2>GitHub</h2>
        <label for="githubToken">GitHub Token</label>
        <input type="text"
          id="githubToken"
          class="form-control"
          value={this.state.githubToken}
          onChange={(e) => this.handleSetGithubToken(e.target.value)}/>
      </div>

      <div class="form-group">
        <h2>GitLab</h2>
        <label for="gitlabToken">GitLab Token</label>
        <input type="text"
          id="gitlabToken"
          class="form-control"
          value={this.state.gitlabToken}
          onChange={(e) => this.handleSetGitlabToken(e.target.value)}/>
      </div>

      <button
        class="btn btn-primary"
        onclick={this.saveConfig}
        >Save</button>
    </div>
  }
}