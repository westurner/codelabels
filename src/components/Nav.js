
import { h, WrappedComponent } from 'preact'
import { Link as NavLink } from 'react-router-dom'

// const wrapNavLink = (WrappedComponent) => (props) => {
//   <WrappedComponent {...props}
//     class="nav-link"
//     activeclassname="active">{props.children}</WrappedComponent>
// }
// const NavLink = wrapNavLink(_NavLink)
const navprops = {class:"nav-link", activeclassname:"active"}

const Nav = ({title="codelabels"}) => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">{title}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <NavLink to="/" {...navprops}>Home</NavLink>
      </li>
      <li class="nav-item">
        <NavLink to="/config" {...navprops}>Config</NavLink>
      </li>
      <li class="nav-item">
        <NavLink to="/about" {...navprops}>About</NavLink>
      </li>
    </ul>
  </div>
</nav>
)

export default Nav