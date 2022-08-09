import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu" data-widget="tree">
          <li className="">
            <Link to={'/'}>
              <i className="iconsmind-Dashboard"></i>
              <span>Dashboard</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-right pull-right"></i>
              </span>
            </Link>
          </li>

          <li className="">
            <Link to={'/usuarios'}>
              <i className="iconsmind-User"></i>
              <span>Usuarios</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-right pull-right"></i>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>

  )
}

export default Sidebar