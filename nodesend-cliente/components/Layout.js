import Head from "next/head";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Enviar archivos</title>
        <script src='https://cdn.tailwindcss.com'></script>
      </Head>

      {/* <img src='logo.svg' /> */}
      <div className='bg-gray-200 min-h-screen'>
        <div className='container mx-auto px-10 py-1'>
          <Header />
          <main className='mt-4'>{children}</main>
        </div>
      </div>
    </>
  );
};
