import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dash/Dashboard";
import Login from "../components/login/Login";
import Usuarios from "../components/usuarios/Usuarios";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
