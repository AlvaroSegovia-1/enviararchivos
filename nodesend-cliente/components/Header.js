import { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import {useRouter} from 'next/router'

export const Header = () => {

  // routing
  const router = useRouter()


  // Extraer el Usuario autenticado del Storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  // Context de la aplicación
  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    //console.log('Redireccionando ...')
    router.push('/')
    limpiarState()
  }

  return (
    <header className='py-4 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img onClick={()=> redireccionar()}
        className='w-64 mb-8 md:mb-0 cursor-pointer' src='/logo.svg' />
      </Link>

      <div className='flex flex-col md:flex-row '>
        {usuario ? (
          <div className=' flex items-center'>
            <p className='mr-2'>Hola {usuario.nombre}</p>
            <button
              type='button'
              className='bg-black px-4 py-2 rounded-lg text-white font-bold uppercase'
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href='/login'>
              <a className='bg-red-500 px-4 py-2 rounded-lg text-white font-bold uppercase mr-2'>
                {" "}
                Iniciar Sesión
              </a>
            </Link>
            <br />
            <Link href='/crearcuenta'>
              <a className='bg-black px-4 py-2 rounded-lg text-white font-bold uppercase'>
                {" "}
                Crear cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

// export default Header;
