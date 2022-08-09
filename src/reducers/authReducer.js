import {
  CERRAR_SESION_EXITO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  REDIRECT_LOGIN_FALSE,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  autenticado: null,
  usuarioAuth: null,
  redirectLogin: false,
  mensaje: null,
  cargando: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_EXITOSO:
      localStorage.setItem("access-token", action.payload.access_token);
      return {
        usuarioAuth: action.payload.user,
        autenticado: true,
        redirectLogin: true,
      };
    case CERRAR_SESION_EXITO:
      localStorage.removeItem("access-token");
      return {
        usuarioAuth: null,
        autenticado: false,
      };
    case REDIRECT_LOGIN_FALSE:
      return { ...state, redirectLogin: false };
    case LOGIN_ERROR:
      return {
        autenticado: !action.payload,
      };
    default:
      return state;
  }
}
