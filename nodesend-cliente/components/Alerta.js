import { useContext } from "react";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alerta = () => {
  //Extraer mensaje error para usuarios
  const AuthContext = useContext(authContext);
  const { mensaje } = AuthContext;

  // Extraer mensaje de error para archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo } = AppContext;

  return (
    <div className='bg-red-500 py-1 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
      {mensaje || mensaje_archivo}
    </div>
  );
};

export default Alerta;
