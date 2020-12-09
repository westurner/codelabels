
import { h, render } from 'preact'
import { Provider } from 'preact-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { store } from './store'
import Nav from './components/Nav'
import App from './components/App'
import About from './components/About'
import Config from './components/Config'

import 'preact/devtools'

const Main = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Nav />
        <Route path="/" exact component={App} />
        <Route path="/about" component={About} />
        <Route path="/config" component={Config} />
      </div>
    </Router>

  </Provider>
);
render(<Main />, document.body)
