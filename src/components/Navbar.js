import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/ch-icon-01.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Fab from '@material-ui/core/Fab';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
        style={{position: "fixed", width: "100%"}}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/">
                Animationen
              </Link>
              <Link className="navbar-item" to="/about">
                Über
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" to="/contact">
                <span className="icon">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </span>
              </Link>
         
              <a
                className="navbar-item"
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://vimeo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={['fab', 'vimeo-v']} size="lg" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
