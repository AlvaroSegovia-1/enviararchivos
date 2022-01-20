import { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

export const Header = () => {
  // Extraer el Usuario autenticado del Storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <header className='py-4 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img className='w-64 mb-8 md:mb-0' src='logo.svg' />
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
