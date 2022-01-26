import { Layout } from "../../components/Layout";
import clienteAxios from "../../config/axios";

export async function getStaticProps({ params }) {
  //console.log(props)

  const { enlace } = params;
  console.log(enlace);
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
  console.log(enlace);
  return (
    <Layout>
      <h1 className=" text-3xl text-center text-gray-500">Descarga tu archivo:</h1>
      <div className="flex items-center justify-center mt-10 ">
          <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="bg-red-500 text-center px-8 py-3 rounded-lg uppercase font-bold text-white cursor-pointer">Aquí</a>
      </div>
    </Layout>
  );
};

export default Named;
