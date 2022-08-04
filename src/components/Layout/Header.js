import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <a
        href="#"
        className="sidebar-toggle"
        data-toggle="push-menu"
        role="button"
      >
        <span className="sr-only">Toggle navigation</span>
      </a>
      <Link to={'/'} className="logo">

        <span className="logo-lg">
          <img
            src='/assets/images/logo-scallia.png'
            alt="logo"
            className="light-logo"
            width={92}
          />
          <img
            src={'./images/logo-scallia.png'}
            alt="logo"
            className="dark-logo"
          />
        </span>

      </Link>

      <nav className="navbar navbar-static-top"></nav>
    </header>
  )
}

export default Header