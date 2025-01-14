import React from 'react';

const StudentProfileDisplay = ({ student, onEdit }) => {
  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        border: '2px solid #9FBFA7', 
        backgroundColor: '#F2F2F2', 
      }}
    >
      {/* Encabezado con imagen y nombre */}
      <div
        className="flex flex-col md:flex-row items-center p-6"
        style={{
          backgroundColor: '#24402B', 
        }}
      >
        <div className="relative w-32 h-32">
          <img
            src={student.foto_perfil || 'https://via.placeholder.com/150'}
            alt="Foto de perfil"
            className="w-full h-full rounded-full object-cover border-4 shadow-lg"
            style={{
              borderColor: '#407348', 
            }}
          />
        </div>
        <div className="ml-0 md:ml-8 mt-4 md:mt-0 text-center md:text-left">
          <h2
            className="text-2xl font-bold"
            style={{
              color: '#F2F2F2', 
            }}
          >
            {student.nombre_completo}
          </h2>
          <p
            className="text-sm"
            style={{
              color: '#9FBFA7', 
            }}
          >
            {student.correo}
          </p>
        </div>
      </div>

      {/* Detalles del estudiante */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p
              className="text-sm font-medium uppercase"
              style={{
                color: '#407348', 
              }}
            >
              Descripción
            </p>
            <p
              className="text-base font-light"
              style={{
                color: '#24402B', 
              }}
            >
              {student.descripcion || 'Sin descripción'}
            </p>
          </div>
          <div>
            <p
              className="text-sm font-medium uppercase"
              style={{
                color: '#407348', 
              }}
            >
              Género
            </p>
            <p
              className="text-base font-light"
              style={{
                color: '#24402B', 
              }}
            >
              {student.genero || 'No especificado'}
            </p>
          </div>
          <div>
            <p
              className="text-sm font-medium uppercase"
              style={{
                color: '#407348', 
              }}
            >
              Municipio
            </p>
            <p
              className="text-base font-light"
              style={{
                color: '#24402B', 
              }}
            >
              {student.municipio || 'No especificado'}
            </p>
          </div>
          <div>
            <p
              className="text-sm font-medium uppercase"
              style={{
                color: '#407348', 
              }}
            >
              Departamento
            </p>
            <p
              className="text-base font-light"
              style={{
                color: '#24402B', 
              }}
            >
              {student.departamento || 'No especificado'}
            </p>
          </div>
          <div>
            <p
              className="text-sm font-medium uppercase"
              style={{
                color: '#407348', 
              }}
            >
              Institución
            </p>
            <p
              className="text-base font-light"
              style={{
                color: '#24402B', 
              }}
            >
              {student.institucion_id || 'No especificado'}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de logros */}
      <div className="p-6">
        <h3
          className="text-lg font-bold mb-4"
          style={{
            color: '#24402B', 
          }}
        >
          Logros
        </h3>
        <ul className="list-disc list-inside space-y-2">
          {student.logros && student.logros.length > 0 ? (
            student.logros.map((logro, index) => (
              <li
                key={index}
                className="text-base font-light"
                style={{
                  color: '#407348', 
                }}
              >
                {logro}
              </li>
            ))
          ) : (
            <p className="text-base font-light" style={{ color: '#9FBFA7' }}>
              No hay logros disponibles.
            </p>
          )}
        </ul>
      </div>

      {/* Sección de insignias */}
      <div className="p-6">
        <h3
          className="text-lg font-bold mb-4"
          style={{
            color: '#24402B', 
          }}
        >
          Insignias
        </h3>
        <div className="flex flex-wrap gap-4">
          {student.insignias && student.insignias.length > 0 ? (
            student.insignias.map((insignia, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full border-4 shadow-md flex items-center justify-center"
                style={{
                  borderColor: '#407348', 
                  backgroundColor: '#F2F2F2', 
                }}
              >
                <img
                  src={insignia.icono || 'https://via.placeholder.com/64'}
                  alt={insignia.nombre}
                  className="w-12 h-12 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-base font-light" style={{ color: '#9FBFA7' }}>
              No hay insignias disponibles.
            </p>
          )}
        </div>
      </div>

      {/* Botón de editar */}
      <div className="p-6 text-center">
        <button
          onClick={onEdit}
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: '#407348', 
            color: '#F2F2F2', 
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#24402B'; 
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#407348'; 
          }}
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default StudentProfileDisplay;
