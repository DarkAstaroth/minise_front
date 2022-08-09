import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap-extend.css";
import "./assets/css/master_style.css";
import "./assets/css/skins/_all-skins.css";
import "./assets/css/minise.css";

import { AppRouter } from "./router/AppRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { REDIRECT_LOGIN_FALSE } from "./types";

function App() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const autenticado = useSelector((state) => state.auth.autenticado);
  const redirectLogin = useSelector((state) => state.auth.redirectLogin);

  useEffect(() => {
    if (autenticado && redirectLogin) {
      history("/");
      dispatch({
        type: REDIRECT_LOGIN_FALSE,
      });
    } else if (!autenticado) {
      history("/login");
    }
  }, [autenticado]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
