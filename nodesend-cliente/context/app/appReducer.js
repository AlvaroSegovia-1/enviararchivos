import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../../types";

export default function (state, action) {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: null,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: null,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        mensaje_archivo: action.payload,
        cargando: null,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        descargas: action.payload,
      };

    default:
      return state;
  }
}
