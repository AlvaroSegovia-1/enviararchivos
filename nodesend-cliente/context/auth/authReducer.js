//import { USUARIO_AUTENTICADO } from "../../types";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
  LIMPIAR_STATE
} from "../../types";

export default function (state, action) {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    /* case REGISTRO_ERROR: */
    /* return {
        ...state,
        mensaje: action.payload,
      }; */
    case LOGIN_EXITOSO:
      localStorage.setItem("rs_token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };

    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true
      };
    case CERRAR_SESION:
      localStorage.removeItem("rs_token");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };
    case LIMPIAR_STATE:
      return{
        ...state,
        mensaje_archivo: null,
        nombre: "",
        nombre_original: "",
        cargando: null,
        descargas: 1,
        password: "",
        autor: null,
        url: "",
      }

    default:
      return state;
  }
}
