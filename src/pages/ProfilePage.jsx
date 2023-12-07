import React from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  // Si el usuario no está autenticado, podrías redirigirlo a la página de inicio de sesión u otra página.
  // Aquí simplemente mostraremos un mensaje si el usuario no está autenticado.
  if (!user) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-700 max-w-md w-full p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Mi Perfil</h1>
      <div>
        <p className="text-gray-600 dark:text-gray-400 my-2">
          <span className="font-bold">Nombre de usuario:</span> {user.username}
        </p>
        {/* Puedes agregar más detalles del perfil según la estructura de tu objeto de usuario */}
      </div>
    </div>
  );
}

export default ProfilePage;
