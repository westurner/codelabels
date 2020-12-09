
import { h, Component } from 'preact'
import PropTypes from 'prop-types'

import Project from './Project'
import { connect } from 'preact-redux';

import * as actions from '../actions'

const mapStateToProps = (state, ownProps) => ({
  projects: state.labelsByProject,
  currentProject: state.projectSelected[ownProps.namespace]
})

@connect(mapStateToProps, actions)
class ProjectList extends Component {
  constructor(props) {
    super(props)
    console.log('statee', this.state)
    console.log('props', props)
    this.state = {
      projects: props.projects,
      currentProject: props.currentProject }
    // = [] //props.labelsByProject || []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const obj = {}  // new Map()
    let changed = false
    if (nextProps.projects != prevState.projects) {
      obj.projects = nextProps.projects
      changed = true
      console.log('newProjects', nextProps.projects)
    }
    if (nextProps.currentProject != prevState.currentProject) {
      obj.currentProject = nextProps.currentProject
      changed = true
    }
    return changed ? obj : null
  }

  render() {
    return <div>
      <Project project={
        {id:"https://gitlab.com/westurner/dotfiles",
        service:"gitlab"}} namespace={this.props.namespace}/>
      {this.props.namespace === 'src' && 
      (this.state.projects._keys ||[]).map((projectid, i) => {
        let project =  this.state.projects[projectid]
        if (project.namespace === 'src') { 
          return <Project key={project.id} project={project} />
        }
      })}
      {this.props.namespace === 'dest' && 
      this.props.currentProject !== undefined &&
      this.state.projects[this.state.currentProject].namespace === 'dest' &&
        <Project key='destproject'
          project={this.state.projects[this.state.currentProject]}
          namespace={this.props.namespace}
          />}
    </div>
  }
}
ProjectList.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
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
    }).isRequired
  )
}

export default ProjectList