import React, { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

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
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEstudiantes = await axios.get(
          "http://localhost:3001/api/estudiantes"
        );

        const estudiantesConDetalles = responseEstudiantes.data.map(
          (estudiante) => {
            const nivel =
              estudiante.nivelesRelacionados?.[0]?.nivel?.nombre || "No asignado";
            const materia =
              estudiante.nivelesRelacionados?.[0]?.nivel?.materia?.nombre ||
              "No asignado";

            return {
              ...estudiante,
              municipio:
                estudiante.institucion?.municipio?.nombre || "No asignado",
              centroEducativo: estudiante.institucion?.nombre || "No asignado",
              tipoCentro: estudiante.institucion?.tipo || "No asignado",
              fechaRegistro: new Date(
                estudiante.fecha_registro
              ).toLocaleDateString(),
              edad: estudiante.edad || "No calculado",
              niveles: nivel,
              materias: materia,
            };
          }
        );

        setUsuarios(estudiantesConDetalles);
      } catch (error) {
        console.error("Error al cargar los datos de los estudiantes", error);
      }
    };

    fetchData();
  }, []);

  const [filters, setFilters] = useState({
    nombre: { enabled: false, value: "" },
    apellido: { enabled: false, value: "" },
    municipio: { enabled: false, value: "" },
    fechaRegistro: { enabled: false, value: "" },
    centroEducativo: { enabled: false, value: "" },
    tipoCentro: { enabled: false, value: "" },
    edad: { enabled: false, value: "" },
    genero: { enabled: false, value: "" },
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

  const downloadPdfDocument = async (data) => {
    const pdf = new jsPDF();
    const marginLeft = 15;
    const pageWidth = pdf.internal.pageSize.width;

    // Agregar título centrado
    pdf.setFontSize(18);
    pdf.text(`INFORME DE ${data.nombre.toUpperCase()} ${data.apellido.toUpperCase()}`, pageWidth / 2, 20, null, null, 'center');

    // Espaciado inicial
    pdf.setFontSize(12);
    pdf.text("Datos del Estudiante:", marginLeft, 40);

    // Agregar encabezados de tabla
    const headers = [
      [
        "Nombre",
        "Apellido",
        "Municipio",
        "Fecha de Registro",
        "Centro Educativo",
        "Tipo Centro",
        "Edad",
        "Género",
        "Niveles",
        "Materias",
      ],
    ];

    // Agregar datos del estudiante
    const rows = [
      [
        data.nombre,
        data.apellido,
        data.municipio,
        data.fechaRegistro,
        data.centroEducativo,
        data.tipoCentro,
        data.edad,
        data.genero,
        data.niveles,
        data.materias,
      ],
    ];

    // Renderizar tabla en el PDF
    pdf.autoTable({
      head: headers,
      body: rows,
      startY: 50, // Ajustar para evitar superposición con el título
      styles: {
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [46, 125, 50], // Verde oscuro
        textColor: [255, 255, 255], // Blanco
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
      },
      margin: { left: marginLeft, right: marginLeft },
    });

    // Guardar PDF con el nombre del estudiante
    pdf.save(`${data.nombre} - ${data.apellido} - report.pdf`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: "4rem",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Informes
        </Typography>
        <Paper
          style={{
            padding: "0.5rem",
            marginBottom: "2rem",
            maxHeight: "220px",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 180px)",
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
                  "Niveles",
                  "Materias",
                  "Acción",
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
                <TableRow key={usr.id} id={`reportRow-${usr.id}`}>
                  <TableCell>{usr.nombre}</TableCell>
                  <TableCell>{usr.apellido}</TableCell>
                  <TableCell>{usr.municipio}</TableCell>
                  <TableCell>{usr.fechaRegistro}</TableCell>
                  <TableCell>{usr.centroEducativo}</TableCell>
                  <TableCell>{usr.tipoCentro}</TableCell>
                  <TableCell>{usr.edad}</TableCell>
                  <TableCell>{usr.genero}</TableCell>
                  <TableCell>{usr.niveles}</TableCell>
                  <TableCell>{usr.materias}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => downloadPdfDocument(usr)}
                      style={{ backgroundColor: "#2e7d32", color: "white" }}
                    >
                      Descargar
                    </Button>
                  </TableCell>
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
