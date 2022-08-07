import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import usuarioContext from "../../context/usuarios/usuarioContext";
import { useDispatch, useSelector } from "react-redux";
import {
  crearNuevoUsuarioAction,
  obtenerUsuarioEditar,
  obtenerUsuariosAction,
} from "../actions/userActions";

const UsuarioForm = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const routeParams = useParams();
  const { userId } = routeParams;

  const usuarioeditar = useSelector((state) => state.usuarios.usuarioeditar);

  let initialValues;
  if (userId == "new") {
    initialValues = {};
  } else {
    initialValues = {
      displayName: usuarioeditar[0].data.displayName,
      email: usuarioeditar[0].data.email,
      password: "",
      confirmpassword: "",
      role: "",
      photoUrl: "",
    };
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      displayName: Yup.string().required("El nombre de usuario es requerido"),
      email: Yup.string()
        .required("El email es requerido")
        .email("Ingresa un email valido"),
      role: Yup.string().required("El rol es requerido"),
      password: Yup.string().required("El password no puede ir vacio"),
      confirmpassword: Yup.string()
        .required("La confirmacion de contraseña es requerida")
        .oneOf(
          [Yup.ref("password"), null],
          "Las contraseñas deben ser iguales"
        ),
    }),
    onSubmit: (valores) => {
      dispatch(crearNuevoUsuarioAction(valores));
      dispatch(obtenerUsuariosAction());
      history("/usuarios");
    },
  });

  return (
    <Layout>
      <div className="content-wrapper">
        <section className="content-header">
          {userId == "new" ? (
            <h1>Nuevo Usuario</h1>
          ) : (
            <h1>Modificar Usuario</h1>
          )}
        </section>
        <div className="content">
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div className="box">
                <div className="box-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="displayName">Nombre de usuario</label>
                      <input
                        name="displayName"
                        id="displayName"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese un nombre de usuario"
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.displayName &&
                      formik.errors.displayName ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {formik.errors.displayName}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Ingrese un email de usuario"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <span className="help-block text-danger m-5">
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        name="password"
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Ingrese una contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <span className="help-block text-danger m-5">
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmpassword">Repita contraseña</label>
                      <input
                        name="confirmpassword"
                        id="confirmpassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirme la contraseña"
                        value={formik.values.confirmpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword ? (
                        <span className="help-block text-danger m-5">
                          {formik.errors.confirmpassword}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="role">Rol</label>
                      <select
                        name="role"
                        id="role"
                        className="form-control"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {userId == "new" ? (
                          <option selected disabled hidden>
                            Elija una opción
                          </option>
                        ) : (
                          <option selected disabled hidden>
                            Elija una opción
                          </option>
                        )}
                        <option value="admin">Administrador</option>
                        <option value="staff">Empleado</option>
                        <option value="seller">Vendedor</option>
                      </select>
                      {formik.touched.role && formik.errors.role ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {formik.errors.role}
                          </span>{" "}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      {userId == "new" ? (
                        <span>Guardar</span>
                      ) : (
                        <span>Guardar cambios</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsuarioForm;
