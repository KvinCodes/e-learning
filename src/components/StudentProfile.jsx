import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudentProfileDisplay from './StudentProfileDisplay';
import StudentProfileEdit from './StudentProfileEdit';

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setStatus('error');
        setError('El ID del estudiante no es válido.');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/estudiantes/${studentId}`);
        setStudent(response.data);
        setStatus('success');
      } catch (err) {
        console.error('Error fetching student:', err);
        setStatus('error');
        setError('Error al cargar el perfil del estudiante.');
      }
    };

    fetchStudent();
  }, [studentId, apiUrl]);

  const handleSave = async (updatedStudent) => {
    try {
      const response = await axios.put(`${apiUrl}/estudiantes/${studentId}`, updatedStudent, {
        headers: { 'Content-Type': 'application/json' },
      });
      setStudent(response.data); // Usa los datos actualizados de la API
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving student:', err);
      setError('Error al guardar los cambios.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  if (status === 'error') {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      {isEditing ? (
        <StudentProfileEdit
          student={student}
          onSave={handleSave}
          onCancel={handleEditToggle}
        />
      ) : (
        <StudentProfileDisplay
          student={student}
          onEdit={handleEditToggle}
        />
      )}
    </div>
  );
};

export default StudentProfile;
