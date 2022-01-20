import { useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
import { useRouter } from "next/router";

export default function Login() {
  // definir el context
  const AuthContext = useContext(authContext);
  const { mensaje, autenticado, iniciarSesion } = AuthContext;

  // Next router
  const router = useRouter();

  useEffect(() => {
    if (autenticado) {
      router.push("/");
    }
  }, [autenticado]);

  // Formulario y validación con formik y Yup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El mail no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: valores => {
      //console.log("Enviando Formulario", valores);
      iniciarSesion(valores);
    },
  });

  return (
    <Layout>
      <div className='md:w-4/5 xl:w3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-600 text-center my-4'>
          {" "}
          Iniciar Sesión
        </h2>
        {mensaje && <Alerta />}
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>
            <form className='' onSubmit={formik.handleSubmit}>
              <div>
                <label
                  className='block text-black text-sm font-bold  py-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  type='email'
                  className='shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  placeholder='Email de Usuario'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='my-4 bg-gray-400 border-l-4 border-r-4 border-red-500 p-4 '>
                    <p className='font-bold '>Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  className='block text-black text-sm font-bold py-2'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  type='password'
                  className='shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='my-4 bg-gray-400 border-l-4 border-r-4 border-red-500 p-4 '>
                    <p className='font-bold '>Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
              <div className='flex flex-col justify-center items-center'>
                <input
                  type='submit'
                  className='    bg-red-500 text-center w-5/6 hover:bg-gray-900 w-full p-2 mt-4 mb-6 text-white uppercase font-bold'
                  value='Iniciar Sesión'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
