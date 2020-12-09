
import { h, Component } from 'preact'
import { connect } from 'preact-redux';

import * as actions from '../actions'
import { rootReducer } from '../reducers'
import Nav from './Nav'
import ProjectList from './ProjectList'


const mapStateToProps = rootReducer
const mapDispatchToProps = actions

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      <main role="main" class="container">
        <div class="row">
          <div class="col-md-6">
            <h2>Sources</h2>
            <ProjectList key="projectlist1" namespace="src" />
          </div>
          <div class="col-md-6">
            <h2>Destination</h2>
            <ProjectList key="projectlist2" namespace="dest" />
          </div>
        </div>
      </main>
    </div>
  }
}