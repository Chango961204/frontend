function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900">
      <div className="bg-white max-w-md w-full p-10 rounded-md shadow-lg text-center">
        <h1 className="text-4xl font-bold my-3 text-gray-800">
          Sistema de Gestión de Productos
        </h1>
        <h2 className="text-2xl font-semibold my-3 text-gray-600">
          Desarrollado en la Materia de Seguridad de Aplicaciones Web
        </h2>

        <div className="text-justify pt-5 mt-5 text-sm text-gray-700">
          <p className="mb-4">
            Este sistema ha sido creado como proyecto académico en la materia de Seguridad de Aplicaciones Web.
          </p>
          <hr className="my-5 h-px border-t-0 bg-gradient-to-r from-gray-300 to-gray-500" />
          <p className="text-center text-xs text-gray-600">
            Creado por: JIVL y LMLR
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
