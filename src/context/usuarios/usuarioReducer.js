import React from 'react'
import { OBTENER_USUARIOS } from '../../types';

const usuarioReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_USUARIOS:
            return {
                ...state,
                usuarios: action.payload
            }
        default:
            break;
    }
}

export default usuarioReducer