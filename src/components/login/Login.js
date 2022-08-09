import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import _ from "../../@lodash";
import { iniciarSesion } from "../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("Ingrese un email valido")
      .required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    try {
      dispatch(iniciarSesion(data));
    } catch (error) {
      console.log("error");
    }
  }

  const autenticado = useSelector((state) => state.auth.autenticado);

  useEffect(() => {
    if (autenticado) {
      history("/");
    }
  }, []);

  return (
    <div
      className="container-fluid pt-3 vh-100"
      style={{
        background: `url(/assets/images/bg-2.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="row h-p100 justify-content-sm-center align-items-center">
        <div className="col-sm-6 col-md-7 col-lg-3">
          <div className="card border-info text-center">
            <div className="card-header">Inicia Sesion para continuar</div>
            <div className="card-body">
              <img
                src="/assets/images/logo-scallia-black.png"
                className="img-fluid w-150 mb-10"
              />
              <h4 className="text-center mb-20">Bienvenido</h4>
              <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className="form-control mb-2"
                      placeholder="Email"
                      autoFocus
                    />
                  )}
                />
                {errors.email ? (
                  <div>
                    <span className="help-block text-danger m-5 text-left">
                      {errors.email.message}
                    </span>
                  </div>
                ) : null}

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="form-control mb-2"
                      placeholder="Contraseña"
                    />
                  )}
                />
                {errors.password ? (
                  <div>
                    <span className="help-block text-danger m-5 text-left">
                      {errors.password.message}
                    </span>
                  </div>
                ) : null}

                <button
                  className="btn btn-lg btn-primary btn-block mb-20"
                  type="submit"
                  // disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Iniciar Sesion
                </button>

                <a href="#" className="float-right">
                  Necesitas sesion?
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
