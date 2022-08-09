import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cerrarSesion } from "../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(cerrarSesion());
  };
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
      <Link to={"/"} className="logo">
        <span className="logo-lg">
          <img
            src="/assets/images/logo-scallia.png"
            alt="logo"
            className="light-logo"
            width={92}
          />
          <img
            src={"./images/logo-scallia.png"}
            alt="logo"
            className="dark-logo"
          />
        </span>
      </Link>

      <nav className="navbar navbar-static-top">
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="iconsmind-User"></i>
              </a>
              <ul className="dropdown-menu scale-up">
                <li className="user-header">
                  {/* <img
                    src="../images/user5-128x128.jpg"
                    className="float-left rounded-circle"
                    alt="User Image"
                  /> */}
                  <p>
                    Johon
                    <small className="mb-5">jb@gmail.com</small>
                  </p>
                </li>

                <li className="user-body">
                  <div className="row no-gutters">
                    <div className="col-12 text-left">
                      <a href="#">
                        <i className="ion ion-person"></i> Mi perfil
                      </a>
                    </div>

                    <div role="separator" className="divider col-12"></div>
                    <div className="col-12 text-left">
                      <a href="#">
                        <i className="ti-settings"></i> Ajuste de cuenta
                      </a>
                    </div>
                    <div role="separator" className="divider col-12"></div>
                    <div className="col-12 text-left">
                      <a href="#" onClick={handleLogOut}>
                        <i className="fa fa-power-off"></i> Salir
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
