import React, { useState } from "react";
import {
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: "#81c784",
    },
  },
});

const ReportsPage = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      municipio: "Guatemala",
      fechaRegistro: "2022-01-01",
      centroEducativo: "Centro Escolar A",
      tipoCentro: "Público",
      edad: 12,
      genero: "Masculino",
      sesionesAbiertas: 3,
      niveles: "Nivel 1",
      materias: "Física",
    },
    {
      id: 2,
      nombre: "Juan",
      apellido: "Martínez",
      municipio: "Santa Tecla",
      fechaRegistro: "2022-09-15",
      centroEducativo: "Colegio Fátima",
      tipoCentro: "Privado",
      edad: 15,
      genero: "Masculino",
      sesionesAbiertas: 2,
      niveles: "Nivel 3",
      materias: "Química",
    },
    {
      id: 3,
      nombre: "Ana",
      apellido: "López",
      municipio: "San Salvador",
      fechaRegistro: "2023-03-22",
      centroEducativo: "Centro Escolar República de China",
      tipoCentro: "Público",
      edad: 14,
      genero: "Femenino",
      sesionesAbiertas: 4,
      niveles: "Nivel 4",
      materias: "Biología",
    },
    {
      id: 4,
      nombre: "Carlos",
      apellido: "Gómez",
      municipio: "Soyapango",
      fechaRegistro: "2023-02-14",
      centroEducativo: "Instituto Nacional de Soyapango",
      tipoCentro: "Público",
      edad: 16,
      genero: "Masculino",
      sesionesAbiertas: 3,
      niveles: "Nivel 6",
      materias: "Física",
    },
    {
      id: 5,
      nombre: "Ana",
      apellido: "López",
      municipio: "San Salvador",
      fechaRegistro: "2023-03-20",
      centroEducativo: "Instituto Nacional Francisco Menéndez (INFRAMEN)",
      tipoCentro: "Público",
      edad: 15,
      genero: "Femenino",
      sesionesAbiertas: 2,
      niveles: "Nivel 1",
      materias: "Biología",
    },
    {
      id: 6,
      nombre: "José",
      apellido: "Martínez",
      municipio: "Ilopango",
      fechaRegistro: "2023-05-10",
      centroEducativo: "Centro Escolar Católico San Bartolo",
      tipoCentro: "Privado",
      edad: 14,
      genero: "Masculino",
      sesionesAbiertas: 1,
      niveles: "Nivel 5",
      materias: "Química",
    },
    {
      id: 7,
      nombre: "Sofía",
      apellido: "Ramírez",
      municipio: "Apopa",
      fechaRegistro: "2023-06-25",
      centroEducativo: "Instituto Nacional de Apopa",
      tipoCentro: "Público",
      edad: 17,
      genero: "Femenino",
      sesionesAbiertas: 4,
      niveles: "Nivel 3",
      materias: "Física",
    },
    {
      id: 8,
      nombre: "Luis",
      apellido: "Rivera",
      municipio: "Santa Tecla",
      fechaRegistro: "2023-07-18",
      centroEducativo: "Instituto Nacional Walter Thilo Deininger",
      tipoCentro: "Público",
      edad: 15,
      genero: "Masculino",
      sesionesAbiertas: 2,
      niveles: "Nivel 6",
      materias: "Biología",
    },
    {
      id: 9,
      nombre: "María",
      apellido: "Hernández",
      municipio: "Antiguo Cuscatlán",
      fechaRegistro: "2023-08-12",
      centroEducativo: "Colegio Madre del Salvador",
      tipoCentro: "Privado",
      edad: 16,
      genero: "Femenino",
      sesionesAbiertas: 3,
      niveles: "Nivel 1",
      materias: "Química",
    },
    {
      id: 10,
      nombre: "Fernando",
      apellido: "Alvarado",
      municipio: "San Marcos",
      fechaRegistro: "2023-09-01",
      centroEducativo: "Instituto Nacional de San Marcos",
      tipoCentro: "Público",
      edad: 17,
      genero: "Masculino",
      sesionesAbiertas: 4,
      niveles: "Nivel 2",
      materias: "Química",
    },
    {
      id: 11,
      nombre: "Diana",
      apellido: "Cruz",
      municipio: "Mejicanos",
      fechaRegistro: "2023-10-05",
      centroEducativo: "Centro Escolar Marcelino García Flamenco",
      tipoCentro: "Público",
      edad: 14,
      genero: "Femenino",
      sesionesAbiertas: 2,
      niveles: "Nivel 3",
      materias: "Biología",
    },
    {
      id: 12,
      nombre: "Ricardo",
      apellido: "Pérez",
      municipio: "San Martín",
      fechaRegistro: "2023-10-20",
      centroEducativo: "Instituto Nacional de San Martín",
      tipoCentro: "Público",
      edad: 15,
      genero: "Masculino",
      sesionesAbiertas: 1,
      niveles: "Nivel 4",
      materias: "Química",
    },
    {
      id: 13,
      nombre: "Gabriela",
      apellido: "Ortiz",
      municipio: "Ciudad Delgado",
      fechaRegistro: "2023-11-10",
      centroEducativo: "Centro Escolar República de Corea",
      tipoCentro: "Público",
      edad: 16,
      genero: "Femenino",
      sesionesAbiertas: 3,
      niveles: "Nivel 5",
      materias: "Física",
    },
    
    // Más usuarios...
  ]);

  const [filters, setFilters] = useState({
    nombre: { enabled: false, value: "" },
    apellido: { enabled: false, value: "" },
    municipio: { enabled: false, value: "" },
    fechaRegistro: { enabled: false, value: "" },
    centroEducativo: { enabled: false, value: "" },
    tipoCentro: { enabled: false, value: "" },
    edad: { enabled: false, value: "" },
    genero: { enabled: false, value: "" },
    sesionesAbiertas: { enabled: false, value: "" },
    niveles: { enabled: false, value: "" },
    materias: { enabled: false, value: "" },
  });

  const handleFilterChange = (field, type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: {
        ...prevFilters[field],
        [type]: value,
      },
    }));
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key].enabled || filters[key].value === "") return true;
      return String(usuario[key])
        .toLowerCase()
        .includes(filters[key].value.toLowerCase());
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Informes
        </Typography>

        {/* Filtros */}
        <Paper
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            maxHeight: "220px",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 190px)",
                gap: "0.9rem",
              }}
            >
              {Object.keys(filters).map((field) => (
                <div key={field}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters[field].enabled}
                        onChange={(e) =>
                          handleFilterChange(field, "enabled", e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label={field.replace(/([A-Z])/g, " $1")}
                    style={{ marginBottom: "0.2rem" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label={`Filtrar por ${field}`}
                    value={filters[field].value}
                    onChange={(e) =>
                      handleFilterChange(field, "value", e.target.value)
                    }
                    disabled={!filters[field].enabled}
                    style={{ marginBottom: "0.2rem" }}
                  />
                </div>
              ))}
            </div>
          </form>
        </Paper>

        {/* Tabla */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#2e7d32" }}>
                {[
                  "Nombre",
                  "Apellido",
                  "Municipio",
                  "Fecha de Registro",
                  "Centro Educativo",
                  "Tipo Centro",
                  "Edad",
                  "Género",
                  "Sesiones Abiertas",
                  "Niveles",
                  "Materias",
                ].map((header) => (
                  <TableCell
                    key={header}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsuarios.map((usr) => (
                <TableRow key={usr.id}>
                  <TableCell>{usr.nombre}</TableCell>
                  <TableCell>{usr.apellido}</TableCell>
                  <TableCell>{usr.municipio}</TableCell>
                  <TableCell>{usr.fechaRegistro}</TableCell>
                  <TableCell>{usr.centroEducativo}</TableCell>
                  <TableCell>{usr.tipoCentro}</TableCell>
                  <TableCell>{usr.edad}</TableCell>
                  <TableCell>{usr.genero}</TableCell>
                  <TableCell>{usr.sesionesAbiertas}</TableCell>
                  <TableCell>{usr.niveles}</TableCell>
                  <TableCell>{usr.materias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default ReportsPage;
