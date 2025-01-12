import React, { useState, useEffect } from "react";
import axios from "axios";

const Busqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setCourses(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, []);

  const filteredCourses = courses.filter(course =>
    course?.name?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar curso..."
        value={busqueda}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded px-3 py-2"
      />
      <div className="mt-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="p-2 border-b">
              {course.name}
            </div>
          ))
        ) : (
          <p>No se encontraron cursos</p>
        )}
      </div>
    </div>
  );
};

export default Busqueda;
