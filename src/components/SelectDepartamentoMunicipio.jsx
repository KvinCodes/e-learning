import React, { useState, useEffect } from "react";
import { fetchDepartamentos, fetchMunicipios } from "../services/api";

function SelectDepartamentoMunicipio() {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");

  useEffect(() => {
    const getDepartamentos = async () => {
      try {
        const data = await fetchDepartamentos();
        console.log("Departamentos recibidos:", data); // Verificar datos
        setDepartamentos(data); // Actualizar estado
      } catch (error) {
        console.error("Error al obtener departamentos:", error);
      }
    };
    getDepartamentos();
  }, []);

  useEffect(() => {
    const getMunicipios = async () => {
      try {
        const data = await fetchMunicipios();
        if (selectedDepartamento) {
          const filteredMunicipios = data.filter(
            (municipio) => municipio.departamento_id === parseInt(selectedDepartamento)
          );
          setMunicipios(filteredMunicipios);
        } else {
          setMunicipios([]);
        }
      } catch (error) {
        console.error("Error al obtener municipios:", error);
      }
    };
    getMunicipios();
  }, [selectedDepartamento]);

  return (
    <div className="flex flex-col items-center justify-center p-20">
      <h1>Selecciona tu ubicación</h1>
      <label>Departamento:</label>
      <select
        value={selectedDepartamento}
        onChange={(e) => setSelectedDepartamento(e.target.value)}
        className="border p-2 rounded"
      >
   <option value="">Selecciona un departamento</option>
    {departamentos.length > 0 &&
      departamentos.map((dep) => (
      <option key={dep.id} value={dep.id}>
        {dep.nombre}
      </option>
    ))}
</select>


      <label>Municipio:</label>
      <select className="border p-2 rounded" disabled={!selectedDepartamento}>
        <option value="">Selecciona un municipio</option>
        {municipios.map((mun) => (
          <option key={mun.id} value={mun.id}>
            {mun.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDepartamentoMunicipio;
