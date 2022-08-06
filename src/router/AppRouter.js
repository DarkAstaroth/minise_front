import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dash/Dashboard";
import Login from "../components/login/Login";
import UsuarioForm from "../components/usuarios/UsuarioForm";
import Usuarios from "../components/usuarios/Usuarios";
import store from "../store";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/usuarios/:userId" element={<UsuarioForm />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
