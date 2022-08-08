import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  COMENZAR_EDICION_USUARIO,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITOSA,
  OBTENER_USUARIO_EDITAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from "../../types";

export function obtenerUsuariosAction() {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    try {
      const respuesta = await clienteAxios.get("/api/user");
      dispatch(descargaUsuariosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaUsuariosError());
    }
  };
}

const descargarUsuarios = () => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: true,
});

const descargaUsuariosExitosa = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITOSA,
  payload: usuarios,
});

const descargaUsuariosError = () => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: true,
});

export function crearNuevoUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(agregarUsuario());
    try {
      const data = {
        password: usuario.password,
        role: {
          value: usuario.role.value,
          label: usuario.role.label,
        },
        data: {
          displayName: usuario.displayName,
          email: usuario.email,
          photoUrl: "string",
        },
      };
      await clienteAxios.post("/api/user", data);
      dispatch(agregarUsuarioExito(data));
      Swal.fire("Correcto", "El usuario se agregó correctamente", "success");
    } catch (error) {
      dispatch(agregarUsuarioError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: `${error.response.data.msg}`,
      });
    }
  };
}

const agregarUsuario = () => ({
  type: AGREGAR_USUARIO,
  payload: true,
});

// si el usuario se guarda en la base de datos
const agregarUsuarioExito = (usuario) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: usuario,
});

// si hubo un error
const agregarUsuarioError = (estado) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: estado,
});

////////////////////// EDITAR

export function obtenerUsuarioEditar(id) {
  return (dispatch) => {
    dispatch(obtenerUsuarioEditarAction(id));
  };
}

const obtenerUsuarioEditarAction = (userId) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: userId,
});

export function editarUsuarioAction(usuario) {
  return async (dispatch) => {
    // dispatch(editarUsuario());
    const data = {
      role: {
        value: usuario.role.value,
        label: usuario.role.label,
      },
      data: {
        displayName: usuario.displayName,
        email: usuario.email,
        photoUrl: "string",
      },
    };

    try {
      await clienteAxios.put(`/api/user/${usuario.id}`, data);
      // dispatch(editarUsuarioExito(usuario));
      Swal.fire("Correcto", "El usuario se modifico correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(editarUsuarioError());
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: `${error.response.data.msg}`,
      });
    }
  };
}

// const editarUsuario = () => ({
//   type: COMENZAR_EDICION_USUARIO,
// });
const editarUsuarioExito = (usuario) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: usuario,
});
const editarUsuarioError = () => ({
  type: USUARIO_EDITADO_ERROR,
  payload: true,
});

/////////////////////ELIMINAR

export function borrarUsuarioAction(id) {
  return async (dispatch) => {
    try {
      dispatch(obtenerUsuarioEliminar(id));

      await clienteAxios.delete(`/api/user/${id}`);
      dispatch(eliminarUsuarioExito());

      // Si se elimina, mostrar alerta
      Swal.fire("Eliminado", "El usuario se eliminó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarUsuarioError());
    }
  };
}

const obtenerUsuarioEliminar = (id) => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: id,
});
const eliminarUsuarioExito = () => ({
  type: USUARIO_ELIMINADO_EXITO,
});
const eliminarUsuarioError = () => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: true,
});
