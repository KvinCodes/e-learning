import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateStudentForm = ({ onSuccess }) => {
  // Estados para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre_completo: "",
    correo: "",
    contrasena: "",
    fecha_nacimiento: "",
    genero: "",
    departamento_id: "",
    municipio_id: "",
    institucion_id: "",
    foto_perfil: null,
  });

  // Estados para cargar datos dinámicos
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  // Cargar departamentos al inicio
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/departamentos`);
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
        setErrorMessage("No se pudieron cargar los departamentos.");
      }
    };
    fetchDepartamentos();
  }, [apiUrl]);

  // Cargar municipios al seleccionar un departamento
  useEffect(() => {
    if (!formData.departamento_id) {
      setMunicipios([]);
      return;
    }

    const fetchMunicipios = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/municipios?departamento_id=${formData.departamento_id}`
        );
        setMunicipios(response.data);
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setErrorMessage("No se pudieron cargar los municipios.");
      }
    };
    fetchMunicipios();
  }, [formData.departamento_id, apiUrl]);

  // Cargar instituciones al seleccionar un municipio
  useEffect(() => {
    if (!formData.municipio_id) {
      setInstituciones([]);
      return;
    }

    const fetchInstituciones = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/instituciones?municipio_id=${formData.municipio_id}`
        );
        setInstituciones(response.data);
      } catch (error) {
        console.error("Error al cargar instituciones:", error);
        setErrorMessage("No se pudieron cargar las instituciones.");
      }
    };
    fetchInstituciones();
  }, [formData.municipio_id, apiUrl]);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejar cambios en el archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, foto_perfil: file }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${apiUrl}/estudiantes`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
      setErrorMessage("No se pudo crear el estudiante. Verifica los datos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Crear Estudiante</h2>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      {/* Inputs de formulario */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          name="nombre_completo"
          value={formData.nombre_completo}
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
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Campos Dinámicos */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Departamento</label>
        <select
          name="departamento_id"
          value={formData.departamento_id}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
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
          value={formData.municipio_id}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Seleccione un municipio</option>
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
          required
        >
          <option value="">Seleccione una institución</option>
          {instituciones.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        Crear Estudiante
      </button>
    </form>
  );
};

export default CreateStudentForm;
