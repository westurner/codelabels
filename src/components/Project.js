
import { h, Component } from 'preact'
import PropTypes from 'prop-types'

import LabelList from './LabelList'

import { RepoServices, getProjectLabels } from '../actions'

import { connect } from 'preact-redux';

import * as actions from '../actions'
import { rootReducer } from '../reducers'

// props: project = {}
@connect(rootReducer, actions)
class Project extends Component {
  constructor(props) {
    super(props)
    console.log('initProject', props)
    if (props.project) {
      if (props.project.service) {
        this.state.service = props.project.service
      }
      if (props.project.id) {
        this.state.id = props.project.id
      }
    }
  }

  addProject = () => {
    const project = {
      service: this.state.service,
      id: this.state.id}
    this.props.selectProject(project, this.props.namespace)
    this.props.getProjectLabels(project, this.props.namespace)
    this.props.fetchLabels(project, this.props.namespace)
  }

  getServiceFromURL(url) {
    let service
    const e = document.createElement('a')
    e.href = url
    const hostname = e.hostname.toLowerCase()
    switch (hostname) {
      case "github.com":
        return RepoServices.GITHUB
      case "gitlab.com":
        return RepoServices.GITLAB
      default:
        return
    }
  }

  setId(id) {
    let service = this.getServiceFromURL(id)
    this.setState({
      service: service,
      id: id})
  }

  setService(service) {
    if ((service === RepoServices.GITHUB)
       || (service === RepoServices.GITLAB)) {
      this.setState({
        service: service
      })
    }
  }

  render() {
    let project = this.props.project || {};
    return <div class="card">
      <div class="card-body">
        <h5 class="card-title"><a href={this.state.id} target="_blank" rel="noopener">{this.state.id}</a></h5>
        {project.isFetching === true &&
        <p>Loading...</p>}
        {project.isFetching !== true && !(project.lastUpdated) &&
          <div class="form-row">
            <div class="col-md-8">
              <input
                value={this.state.id}
                class="form-control form-control-sm"
                onInput={e => {this.setId(e.target.value)}}
                placeholder="https://github.com/orgname/projname"
              />
            </div>
            <div class="col-md-2">
              <select
                value={this.state.service}
                class="custom-select custom-select-sm"
                onInput={e => this.setService(e.target.value)}
              >
                {Object.values(RepoServices).map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div class="col-md-1">
              <button
                onclick={this.addProject}
                class="btn btn-primary btn-sm"
                >Load</button>
            </div>
          </div>
         }
        <LabelList labels={project.labels}/>
      </div>
    </div>
  }
}
Project.propTypes = {
  project: PropTypes.shape({
    service: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string
      }).isRequired
    )
  })
}

export default Project