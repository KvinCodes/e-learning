import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudentProfileDisplay from './StudentProfileDisplay';
import StudentProfileEdit from './StudentProfileEdit';

const StudentProfile = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${apiUrl}/estudiantes/${id}`);
        setStudent(response.data);
        setStatus('success');
      } catch (err) {
        console.error('Error fetching student:', err);
        setStatus('error');
        setError('Error al cargar el perfil del estudiante.');
      }
    };

    fetchStudent();
  }, [id, apiUrl]);

  const handleSave = async (updatedStudent) => {
    try {
      const response = await axios.put(`${apiUrl}/estudiantes/${id}`, updatedStudent);
      setStudent(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving student:', err);
      setError('Error al guardar los cambios.');
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  if (status === 'loading') return <p className="text-center">Cargando perfil...</p>;
  if (status === 'error') return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10">
      {isEditing ? (
        <StudentProfileEdit student={student} onSave={handleSave} onCancel={handleEditToggle} />
      ) : (
        <StudentProfileDisplay student={student} onEdit={handleEditToggle} />
      )}
    </div>
  );
};

export default StudentProfile;
