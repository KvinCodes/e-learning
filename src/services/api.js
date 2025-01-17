const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
console.log("API_URL configurada:", API_URL);

export { API_URL };
// Obtener todos los departamentos
export const fetchDepartamentos = async () => {
  const response = await fetch(`${API_URL}/departamentos`);
  if (!response.ok) {
    throw new Error("Error fetching departamentos");
  }
  return response.json();
};

// Obtener todos los municipios
export const fetchMunicipios = async () => {
  const response = await fetch(`${API_URL}/municipios`);
  if (!response.ok) {
    throw new Error("Error fetching municipios");
  }
  return response.json();
};

// Obtener todas las instituciones
export const fetchInstituciones = async () => {
  const response = await fetch(`${API_URL}/instituciones`);
  if (!response.ok) {
    throw new Error("Error fetching instituciones");
  }
  return response.json();
};

// Obtener un estudiante por ID
export const fetchEstudianteById = async (id) => {
  const response = await fetch(`${API_URL}/estudiantes/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching estudiante");
  }
  return response.json();
};

// Actualizar un estudiante
export const updateEstudiante = async (id, data) => {
  const response = await fetch(`${API_URL}/estudiantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error updating estudiante");
  }
  return response.json();
};

// Crear un nuevo estudiante
export const createEstudiante = async (data) => {
  const response = await fetch(`${API_URL}/estudiantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error creating estudiante");
  }
  return response.json();
};

// Eliminar un estudiante
export const deleteEstudiante = async (id) => {
  const response = await fetch(`${API_URL}/estudiantes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting estudiante");
  }
};
