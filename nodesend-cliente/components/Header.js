import Link from "next/link";

export const Header = () => {
  return (
    <header className='py-6 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img className='w-64 mb-8 md:mb-0' src='logo.svg' />
      </Link>

      <div className="flex flex-col md:flex-row ">
        <Link href='/login'>
          <a className='bg-red-500 px-4 py-2 rounded-lg text-white font-bold uppercase mr-2'>
            {" "}
            Iniciar Sesión
          </a>
          
        </Link>
        <br/>
        <Link href='/crearcuenta'>
          <a className='bg-black px-4 py-2 rounded-lg text-white font-bold uppercase'>
            {" "}
            Crear cuenta
          </a>
        </Link>
      </div>
    </header>
  );
};

// export default Header;
