import {
  AGREGAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  USUARIO_ACTUAL,
} from "../types";

// cada reducer tiene su propio state
// const initialState = {
//   productos: [],
//   error: null,
//   loading: false,
//   productoeliminar: null,
//   productoeditar: null,
// };


const initialState = {
    usuarios: [],
    errorUsuario: false,
    usuario: null,
  };

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
