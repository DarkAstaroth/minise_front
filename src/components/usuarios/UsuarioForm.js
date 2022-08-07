import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import _ from "../../@lodash";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../Layout/Layout";
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

  const schema = Yup.object({
    displayName: Yup.string().required("El nombre de usuario es requerido"),
    email: Yup.string()
      .required("El email es requerido")
      .email("Ingresa un email valido"),
    role: Yup.string().required("El rol es requerido"),
    password: Yup.string().required("El password no puede ir vacio"),
    confirmpassword: Yup.string()
      .required("La confirmacion de contraseña es requerida")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales"),
  });

  const defaultValues = {
    displayName: "",
    email: "",
    role: "",
    password: "",
  };

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

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
                  <form
                    name="usuarioForm"
                    // onSubmit={formik.handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="displayName">Nombre de Usuario</label>
                      <Controller
                        name="displayName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control"
                            placeholder="Ingrese nombre de usuario"
                          />
                        )}
                      />
                      {errors.displayName ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {errors.displayName.message}
                          </span>
                        </div>
                      ) : (
                        null
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            className="form-control"
                            placeholder="Ingrese un email de usuario"
                          />
                        )}
                      />
                      {errors.email ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {errors.email.message}
                          </span>
                        </div>
                      ) : (
                        null
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            className="form-control"
                            placeholder="Ingrese una contraseña"
                          />
                        )}
                      />
                      {errors.password ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {errors.password.message}
                          </span>
                        </div>
                      ) : (
                        null
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmpassword">
                        Confirmar Contraseña
                      </label>
                      <Controller
                        name="confirmpassword"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            className="form-control"
                            placeholder="Confirme la contraseña"
                          />
                        )}
                      />
                      {errors.confirmpassword ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {errors.confirmpassword.message}
                          </span>
                        </div>
                      ) : (
                        null
                      )}
                    </div>

                    {/* <div className="form-group">
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
                    </div> */}

                    {/* <div className="form-group">
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
                    </div> */}

                    {/* <div className="form-group">
                      <label htmlFor="role">Rol</label>
                      <select
                        name="role"
                        id="role"
                        className="form-control"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          Elije una opcion
                        </option>
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
                    </div> */}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
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
