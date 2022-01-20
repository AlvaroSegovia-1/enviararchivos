//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import Alerta from "../components/Alerta";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";

export default function Index() {
  // Extraer el Usuario autenticado del Storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  // Extraer el mensaje de error de archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo } = AppContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        {mensaje_archivo && <Alerta />}
        <div className='lg:flex shadow-lg p-5 bg-white rounded-lg py-10'>
          <Dropzone />

          <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
            <h2 className='text-2xl font-sans font-bold text-gray-800 '>
              Compartir archivos de forma sencilla y privada
            </h2>
            <p className='text-md leading-loose'>
              <span className='text-red-500'>ReactNodeSend</span> te permite
              compartir archivos con cifrado de extremo a extremo y un archivo
              que es eliminado después de ser descargado. Así que puedes
              mantener lo que compartes en privado y asegurarte de que tus cosas
              no permanezcan en linea para siempre.
            </p>
            <Link href='/crearcuenta'>
              <a className='text-red-500 font-bold text-lg hover:text-red-700'>
                Crea una cuenta para compartir más archivos
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
