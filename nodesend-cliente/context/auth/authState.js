import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

//import { USUARIO_AUTENTICADO } from "../../types";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("rs_token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevos usuarios
  const registrarUsuario = async datos => {
    //console.log(datos);
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta.data.msg);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpia la alerta despues de 2 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 2000);
  };

  // Autenticar usuarios
  const iniciarSesion = async datos => {
    //console.log(datos)

    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      //console.log(respuesta.data.token);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }

    // Limpia la alerta despues de 2 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 2000);
  };

  // Retorne el Usuario autenticado en base al JWT
  const usuarioAutenticado = async () => {
    //console.log("Revisando ...");
    const token = localStorage.getItem("rs_token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      //console.log(respuesta.data.usuario);
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Cerrar la sesión

  const cerrarSesion = () => {
    //console.log('cerrando sesión ')

    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;