import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  auth: authReducer,
  usuarios: usuariosReducer,
});
