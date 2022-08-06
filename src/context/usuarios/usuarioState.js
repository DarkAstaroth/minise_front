import React, { useReducer } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import {
  AGREGAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  USUARIO_ACTUAL,
} from "../../types";
import usuarioContext from "./usuarioContext";
import UsuarioReducer from "./usuarioReducer";

const UsuarioState = (props) => {
  const navigate = useNavigate();

  const initialState = {
    usuarios: [],
    errorUsuario: false,
    usuario: null,
  };

  const [state, dispatch] = useReducer(UsuarioReducer, initialState);

  // funciones
  const obtenerUsuarios = async () => {
    try {
      const resultado = await clienteAxios.get("/api/user");
      dispatch({
        type: OBTENER_USUARIOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUsuario = async (usuarioId) => {
    try {
      const resultado = await clienteAxios.get(`/api/user/${usuarioId}`);

      dispatch({
        type: USUARIO_ACTUAL,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const crearUsuario = async (valores) => {
    try {
      const data = {
        password: valores.password,
        role: valores.role,
        data: {
          displayName: valores.displayName,
          email: valores.email,
          photoUrl: "string",
        },
      };

      const resultado = await clienteAxios.post("/api/user", data);
      Swal.fire("Bien hecho!", "Usuario registrado con exito!", "success");
      navigate("/usuarios");

      dispatch({
        type: AGREGAR_USUARIO,
        payload: resultado.data.user,
      });
    } catch (error) {
      Swal.fire("Upss!", error.response.data.msg, "error");
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await clienteAxios.delete(`/api/user/${id}`);
      dispatch({
        type: ELIMINAR_USUARIO,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <usuarioContext.Provider
      value={{
        usuarios: state.usuarios,
        usuario: state.usuario,
        obtenerUsuario,
        obtenerUsuarios,
        crearUsuario,
        eliminarUsuario,
      }}
    >
      {props.children}
    </usuarioContext.Provider>
  );
};

export default UsuarioState;
