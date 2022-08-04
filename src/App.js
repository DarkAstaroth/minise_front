import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap-extend.css";
import "./assets/css/master_style.css";
import "./assets/css/skins/_all-skins.css";
import { Layout } from "./components/Layout/Layout";
import { AppRouter } from "./router/AppRouter";
import UsuarioState from "./context/usuarios/usuarioState";

function App() {
  return (
    <>
      <UsuarioState>
        <AppRouter />
      </UsuarioState>
    </>
  );
}

export default App;
