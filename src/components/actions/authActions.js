import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { CERRAR_SESION_EXITO, LOGIN_ERROR, LOGIN_EXITOSO } from "../../types";

////////////////////////INICIAR SESION

export function iniciarSesion(datos) {
  return async (dispatch) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/login", datos);
      dispatch(loginExitoso(respuesta.data));
    } catch (error) {
      dispatch(loginError());
      console.log(error);
    }
  };
}

const loginExitoso = (authData) => ({
  type: LOGIN_EXITOSO,
  payload: authData,
});

const loginError = () => ({
  type: LOGIN_ERROR,
  payload: true,
});

//////////////////// CERRAR SESION
export function cerrarSesion() {
  return async (dispatch) => {
    try {
      dispatch(cerrarSesionExito());
    } catch (error) {
      console.log("error");
    }
  };
}

const cerrarSesionExito = () => ({
  type: CERRAR_SESION_EXITO,
});
