import { Layout } from "../../components/Layout";
import clienteAxios from "../../config/axios";
import React, { useState, useContext } from "react";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";

export async function getStaticProps({ params }) {
  //console.log(props)

  const { enlace } = params;
  //console.log(enlace);
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

  //console.log(resultado);

  return {
    props: {
      enlace: resultado.data,
    },
  };
}

export async function getStaticPaths() {
  const enlaces = await clienteAxios.get("/api/enlaces");

  //console.log(enlaces.data);

  return {
    paths: enlaces.data.enlaces.map(enlace => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

const Named = ({ enlace }) => {
  const AppContext = useContext(appContext);
  const { mostrarAlerta, mensaje_archivo } = AppContext;

  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState("");

  console.log(tienePassword);

  //console.log(enlace);

  const verificarPassword = async e => {
    e.preventDefault();
    //console.log('verificando ...')

    const data = {
      password,
    };

    try {
      const resultado = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data,
      );
      setTienePassword(resultado.data.password);
      console.log(resultado);
    } catch (error) {
      // console.log(error.response.data.msg);
      mostrarAlerta(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className='text-center'>
            Este enlace esta protegido por un password, colocalo a continuación:
          </p>
          {mensaje_archivo && <Alerta />}
          <div className='flex justify-center mt-5'>
            <div className='w-full mas-w-lg'>
              <form
                className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                onSubmit={e => verificarPassword(e)}
              >
                <div className='mb-4'>
                  <label
                    className='block text-black text-sm font-bold  py-2'
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    className='shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    placeholder='Password del enlace'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  className='    bg-red-500 text-center w-5/6 hover:bg-gray-900 w-full p-2 mt-4 mb-6 text-white uppercase font-bold'
                  value='Validar Password'
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className=' text-3xl text-center text-gray-500'>
            Descarga tu archivo:
          </h1>
          <div className='flex items-center justify-center mt-10 '>
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className='bg-red-500 text-center px-8 py-3 rounded-lg uppercase font-bold text-white cursor-pointer'
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Named;