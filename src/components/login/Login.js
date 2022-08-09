import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

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

  return (
    <div
      class="container pt-3 vh-100"
      style={{
        background: `url(/assets/images/bg-2.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div class="row h-p100 justify-content-sm-center align-items-center">
        <div class="col-sm-6 col-md-4">
          <div class="card border-info text-center">
            <div class="card-header">Inicia Sesion para continuar</div>
            <div class="card-body">
              <img
                src="/assets/images/logo-scallia-black.png"
                class="img-fluid w-150 mb-10"
              />
              <h4 class="text-center mb-20">Bienvenido</h4>
              <form class="form-signin">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      class="form-control mb-2"
                      placeholder="Email"
                      autofocus
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
                      class="form-control mb-2"
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
                  class="btn btn-lg btn-primary btn-block mb-20"
                  type="submit"
                >
                  Iniciar Sesion
                </button>

                <a href="#" class="float-right">
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
