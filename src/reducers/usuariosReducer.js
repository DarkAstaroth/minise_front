import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITOSA,
  OBTENER_USUARIO_EDITAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from "../types";

const initialState = {
  usuarios: [],
  error: null,
  loading: false,
  usuarioeliminar: null,
  usuarioeditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_USUARIOS:
    case AGREGAR_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: [...state.usuarios, action.payload],
      };
    case DESCARGA_USUARIOS_EXITOSA:
      return {
        ...state,
        loading: false,
        error: null,
        usuarios: action.payload,
        usuarioeditar: null,
        usuarioeliminar: null,
      };
    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        usuarioeditar: state.usuarios.filter(
          (usuario) => usuario.id == action.payload
        ),
      };
    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        usuarioeditar: null,
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === action.payload.id
            ? (usuario = action.payload)
            : usuario
        ),
      };
    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usuarioeliminar: action.payload,
      };
    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario.id !== state.usuarioeliminar
        ),
        usuarioeliminar: null,
      };
    case AGREGAR_USUARIO_ERROR:
    case DESCARGA_USUARIOS_ERROR:
    case USUARIO_ELIMINADO_ERROR:
    case USUARIO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
