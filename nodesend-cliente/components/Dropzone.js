import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";

const Dropzone = () => {
  const onDropRejected = () => {
    console.log("no se pudo subir");
  };

  const onDropAccepted = useCallback(async acceptedFiles => {
    //console.log(acceptedFiles);

    // Crear un form Data
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);

    const resultado = await clienteAxios.post("/api/archivos", formData);
    console.log(resultado.data);
  }, []);

  // Extraer contenido de Dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivos = acceptedFiles.map(archivo => (
    <li
      key={archivo.lastModified}
      className='bg-white flex-1 p-3 mb-4 shadow-lg rounded-md'
    >
      <p className='text-sm '>{archivo.path}</p>
      <p className='text-sm text-gray-300'>
        {(archivo.size / Math.pow(1024, 2)).toFixed(4)} MB
      </p>
    </li>
  ));

  const crearEnlace = () => {
    console.log("Creando el enlace");
  };

  return (
    <div
      className='  md:flex-1 mb-3 mx-4 mt-8 h-80 lg:mt-0 flex flex-col 
    items-center justify-center border-dashed border-gray-400
     border-2 rounded bg-gray-100 px-4 p-1 '
    >
      {acceptedFiles.length > 0 ? (
        <div className=' text-center w-full'>
          <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
          <ul className=''>{archivos}</ul>
          <button
            className='bg-blue-400  px-4 py-1 rounded-lg text-white my-6
                     hover:bg-blue-600'
            onClick={() => crearEnlace()}
          >
            Crear Enlace
          </button>
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className='h-100' {...getInputProps()} />

          {isDragActive ? (
            <p className='text-2xl text-center text-gray-600'>
              Suelta el archivo
            </p>
          ) : (
            <>
              <div className='text-center'>
                <p className='text-1xl text-center text-gray-400  '>
                  Selecciona un archivo y arrástralo aquí.
                </p>
                <button
                  className='bg-blue-400 w-full py-1 rounded-lg text-white my-6
                     hover:bg-blue-600'
                  type='button'
                >
                  Selecciona archivos para subir.
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
