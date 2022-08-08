import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import _ from "../../@lodash";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  crearNuevoUsuarioAction,
  editarUsuarioAction,
  obtenerUsuarioEditar,
  obtenerUsuariosAction,
} from "../actions/userActions";
import Swal from "sweetalert2";

const UsuarioForm = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const routeParams = useParams();
  const { userId } = routeParams;

  const [role, setRole] = useState("");

  const usuarioeditar = useSelector((state) => state.usuarios.usuarioeditar);

  let schema;
  let defaultValues;
  if (userId === "new") {
    defaultValues = {
      displayName: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: {},
    };

    schema = Yup.object({
      displayName: Yup.string().required("El nombre de usuario es requerido"),
      email: Yup.string()
        .required("El email es requerido")
        .email("Ingresa un email valido"),
      password: Yup.string().required("El password no puede ir vacio"),
      confirmpassword: Yup.string()
        .required("La confirmacion de contraseña es requerida")
        .oneOf(
          [Yup.ref("password"), null],
          "Las contraseñas deben ser iguales"
        ),
      role: Yup.object({
        value: Yup.string().required("El rol es requerido"),
      }),
    });
  } else {
    defaultValues = {
      displayName: "",
      email: "",
      role: {},
    };

    schema = Yup.object({
      displayName: Yup.string().required("El nombre de usuario es requerido"),
      email: Yup.string()
        .required("El email es requerido")
        .email("Ingresa un email valido"),
      // password: Yup.string().required("El password no puede ir vacio"),
      // confirmpassword: Yup.string()
      //   .required("La confirmacion de contraseña es requerida")
      //   .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales"),
      role: Yup.object({
        value: Yup.string().required("El rol es requerido"),
      }),
    });
  }

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (userId !== "new") {
      setValue("displayName", usuarioeditar[0].data.displayName);
      setValue("email", usuarioeditar[0].data.email);
      setValue("role", {
        value: usuarioeditar[0].role.value,
        label: usuarioeditar[0].role.label,
      });
    }
  }, []);

  function onSubmit(data) {
    if (userId === "new") {
      dispatch(crearNuevoUsuarioAction(data));
      history("/usuarios");
    } else {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Deseas modificar al usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Modificar!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          data.id = usuarioeditar[0].id;
          dispatch(editarUsuarioAction(data));
          history("/usuarios");
        }
      });
    }
  }

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
                  <form name="usuarioForm" onSubmit={handleSubmit(onSubmit)}>
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
                      ) : null}
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
                      ) : null}
                    </div>

                    {userId === "new" ? (
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
                        ) : null}
                      </div>
                    ) : null}

                    {userId === "new" ? (
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
                              placeholder="Ingrese una contraseña"
                            />
                          )}
                        />
                        {errors.confirmpassword ? (
                          <div>
                            <span className="help-block text-danger m-5">
                              {errors.confirmpassword.message}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="form-group">
                      <label htmlFor="role">Rol de usuario</label>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={[
                              { value: "admin", label: "Administrador" },
                              { value: "staff", label: "Empleado" },
                              { value: "seller", label: "Vendedor" },
                            ]}
                          />
                        )}
                      />
                      {errors.role ? (
                        <div>
                          <span className="help-block text-danger m-5">
                            {errors.role.value.message}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      // disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                      {userId == "new" ? (
                        <span>Guardar</span>
                      ) : (
                        <span>Guardar cambios</span>
                      )}
                    </button>

                    {userId === "new" ? null : (
                      <button className="btn btn-warning m-5">
                        Cambiar contraseña
                      </button>
                    )}
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
