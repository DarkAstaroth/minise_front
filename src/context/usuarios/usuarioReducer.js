import {
  AGREGAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  USUARIO_ACTUAL,
} from "../../types";

const usuarioReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case USUARIO_ACTUAL:
      return {
        ...state,
        usuario: action.payload,
      };
    case AGREGAR_USUARIO:
      return {
        ...state,
        usuarios: [action.payload, ...state.usuarios],
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.filter((item) => item.id !== action.payload),
      };
    default:
      break;
  }
};

export default usuarioReducer;
