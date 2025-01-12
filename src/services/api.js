const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"; //process.env.REACT_APP_API_URL || "http://localhost:3001/api";
console.log("API_URL configurada:", API_URL);

export const fetchDepartamentos = async () => {
  const response = await fetch(`${API_URL}/departamentos`);
  if (!response.ok) {
    throw new Error("Error fetching departamentos");
  }
  return response.json();
};

export const fetchMunicipios = async () => {
  const response = await fetch(`${API_URL}/municipios`);
  if (!response.ok) {
    throw new Error("Error fetching municipios");
  }
  return response.json();
};

export const fetchInstituciones = async () => {
  const response = await fetch(`${API_URL}/instituciones`);
  if (!response.ok) {
    throw new Error("Error fetching instituciones");
  }
  return response.json();
};