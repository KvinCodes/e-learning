
import React from 'react';

const UserProfileDisplay = ({ userInfo, achievements, onEdit }) => {
  return (
    <>
      <div className="flex items-center mb-8 px-6">
        <div className="relative w-32 h-32">
          <img
            src={userInfo.foto_perfil || 'https://via.placeholder.com/150'} // Imagen por defecto si no hay foto
            alt="Foto de perfil"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>
        <div className="ml-8 flex-1">
          <h2 className="text-xl font-bold text-gray-800">{userInfo.nombre_completo}</h2>
          <p className="text-gray-600">{userInfo.correo}</p>
          <p className="text-gray-700 mt-4">{userInfo.descripcion || 'Sin descripción'}</p>
          <p className="text-gray-600 mt-2">Género: {userInfo.genero || 'No especificado'}</p>
          <p className="text-gray-600 mt-2">
            Municipio: {userInfo.municipio || 'No especificado'}
          </p>
          <p className="text-gray-600 mt-2">
            Departamento: {userInfo.departamento || 'No especificado'}
          </p>
          <p className="text-gray-600 mt-2">
            Institución: {userInfo.institucion_id || 'No especificado'}
          </p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Editar Perfil
      </button>
      <h2 className="text-2xl font-bold mt-10 mb-6 text-center">Logros y Distinciones</h2>
      <ul className="grid grid-cols-2 gap-6 px-6">
        {achievements.map((achievement) => (
          <li
            key={achievement.id}
            className="p-6 bg-gray-100 rounded-lg shadow flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-gray-800">{achievement.name}</span>
            <span className="text-3xl">{achievement.badge}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserProfileDisplay;