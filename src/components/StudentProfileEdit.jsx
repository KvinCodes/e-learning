import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfileEdit = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: student.nombre || '',
    apellido: student.apellido || '',
    correo: student.correo || '',
    descripcion: student.descripcion || '',
    fecha_nacimiento: student.fecha_nacimiento || '',
    genero: student.genero || '',
    institucion_id: student.institucion_id || '',
    departamento_id: '',
    municipio_id: '',
    foto_perfil: student.foto_perfil || '',
    contrasena: '', // Nueva contraseña
  });

  const [instituciones, setInstituciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const response = await axios.get(`${apiUrl}/instituciones`);
        setInstituciones(response.data);
      } catch (error) {
        console.error('Error al obtener instituciones:', error);
      }
    };

    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/departamentos`);
        setDepartamentos(response.data);
      } catch (error) {
        console.error('Error al obtener departamentos:', error);
      }
    };

    fetchInstituciones();
    fetchDepartamentos();
  }, [apiUrl]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        if (formData.departamento_id) {
          const response = await axios.get(`${apiUrl}/municipios?departamento_id=${formData.departamento_id}`);
          setMunicipios(response.data);
        } else {
          setMunicipios([]);
        }
      } catch (error) {
        console.error('Error al obtener municipios:', error);
      }
    };

    fetchMunicipios();
  }, [formData.departamento_id, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, foto_perfil: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>

        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Apellido</label>

        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Género</label>
        <select
          name="genero"
          value={formData.genero}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccione un género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Departamento</label>
        <select
          name="departamento_id"
          value={formData.departamento_id}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccione un departamento</option>
          {departamentos.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Municipio</label>
        <select
          name="municipio_id"
          value={formData.municipio_id || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Selecciona un municipio</option>
          {municipios.map((mun) => (
            <option key={mun.id} value={mun.id}>
              {mun.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Institución</label>
        <select
          name="institucion_id"
          value={formData.institucion_id}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccione una institución</option>
          {instituciones.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
        <input
          type="file"
          name="foto_perfil"
          onChange={handleFileChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formData.foto_perfil && (
          <img
            src={formData.foto_perfil}
            alt="Vista previa"
            className="mt-4 w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default StudentProfileEdit;
