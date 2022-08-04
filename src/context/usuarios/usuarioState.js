import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import { OBTENER_USUARIOS } from '../../types'
import usuarioContext from './usuarioContext'
import UsuarioReducer from './usuarioReducer'

const UsuarioState = props => {
    const initialState = {
        usuarios: [],
        errorUsuario: false
    }

    const [state, dispatch] = useReducer(UsuarioReducer, initialState);

    // funciones 
    const obtenerUsuarios = async () => {
        try {
            const resultado = await clienteAxios.get('/api/user')
            dispatch({
                type: OBTENER_USUARIOS,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <usuarioContext.Provider
            value={{ usuarios: state.usuarios, obtenerUsuarios }}
        >
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsuarioState