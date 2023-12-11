import React, { useEffect,useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user, editUser, deleteUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEditClick = () => {
    setEditMode(!editMode);
    setNewUsername('');
    setNewPassword('');
  };

  const handleSaveChanges = async () => {
    try {
      await editUser( newUsername, user.id);
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      // Manejar el error, mostrar un mensaje, etc.
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      // Aquí podrías redirigir al usuario a una página de inicio de sesión u otra página
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      // Manejar el error, mostrar un mensaje, etc.
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 max-w-md w-full p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Mi Perfil</h1>
      <div>
        <p className="text-gray-600 dark:text-gray-400 my-2">
          <span className="font-bold">Nombre de usuario:</span> {user.username}
        </p>
        {editMode ? (
          <div>
            <label htmlFor="newUsername" className="block text-sm font-medium text-gray-800 dark:text-white">
              Nuevo Nombre de Usuario:
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full text-gray-800 dark:text-black"
            />


            <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
              Guardar Cambios
            </button>
            <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">
              Eliminar Cuenta
            </button>
            <button onClick={handleEditClick} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-2">
              Cancelar
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
              Editar Perfil
            </button>
            <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2">
              Eliminar Cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
