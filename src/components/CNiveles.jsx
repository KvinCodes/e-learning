import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function CNiveles() {
  const [value, setValue] = useState("septimo"); // Nivel seleccionado
  const [quizzes, setQuizzes] = useState([]); // Todos los cuestionarios de biología
  const [filteredQuizzes, setFilteredQuizzes] = useState([]); // Cuestionarios filtrados por nivel
  const navigate = useNavigate();

  // Cambiar nivel cuando se selecciona un tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Estilo dinámico de los tabs
  const tabStyles = (tabValue) => ({
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: "Poppins, serif", // Cambiamos a Poppins ExtraBold
    fontWeight: 800,
    fontSize: "16px",
    letterSpacing: "0.5px",
    backgroundColor: value === tabValue ? "#16a34a" : "#15803d",
    borderRadius: "4px",
    flex: 1,
    height: "100px", // Aumentamos la altura de los tabs
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "8px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#16a34a",
      transform: "scale(1.05)",
    },
    "&.Mui-selected": {
      backgroundColor: "#16a34a",
      transform: "scale(1.05)",
      color: "#FFFFFF",
    },
  });

  // Obtener cuestionarios desde la API y filtrar por biología (materia_id: 4)
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/quizzes");
        const biologyQuizzes = response.data.filter((quiz) => quiz.materia_id === 1); // Filtrar por biología
        setQuizzes(biologyQuizzes);
      } catch (error) {
        console.error("Error al obtener los cuestionarios:", error);
      }
    };
    fetchQuizzes();
  }, []);

  // Filtrar los cuestionarios según el nivel seleccionado
  useEffect(() => {
    const filtered = quizzes.filter((quiz) => quiz.nivel === value);
    setFilteredQuizzes(filtered);
  }, [value, quizzes]);

  const handleNavigate = (id) => {
    navigate(`/quiz/${id}`);
  };

  const renderCards = (cards) => {
    if (cards.length === 0) {
      return <Typography>No hay cuestionarios disponibles para este nivel.</Typography>;
    }

    return (
      <Grid container spacing={3}>
        {cards.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "200px" }}> {/* Ajustamos el tamaño y estilo de las tarjetas */}
              <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ fontFamily: "Poppins, serif", fontWeight: 500 }}
                >
                  {quiz.titulo}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ fontFamily: "Poppins, serif", fontWeight: 400, marginTop: "8px" }}
                >
                  {quiz.descripcion}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigate(quiz.id)}
                  sx={{ marginTop: "16px", fontFamily: "Poppins, serif", fontWeight: 500, backgroundColor: "#84cc16" }}
                >
                  Resolver
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#ecfccb" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="vertical tabs with icons"
        sx={{
          backgroundColor: "#15803d",
          width: "200px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#FFFFFF",
            width: "4px",
          },
        }}
      >
        <Tab value="septimo" label="Séptimo Grado" icon={<MenuBookIcon />} iconPosition="start" sx={tabStyles("septimo")} />
        <Tab value="octavo" label="Octavo Grado" icon={<ScienceIcon />} iconPosition="start" sx={tabStyles("octavo")} />
        <Tab value="noveno" label="Noveno Grado" icon={<PsychologyIcon />} iconPosition="start" sx={tabStyles("noveno")} />
        <Tab value="primer_ano" label="Primer Año" icon={<SchoolIcon />} iconPosition="start" sx={tabStyles("primer_ano")} />
        <Tab value="segundo_ano" label="Segundo Año" icon={<AutoStoriesIcon />} iconPosition="start" sx={tabStyles("segundo_ano")} />
        <Tab value="tercer_ano" label="Tercer Año" icon={<ScienceIcon />} iconPosition="start" sx={tabStyles("tercer_ano")} />
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {renderCards(filteredQuizzes)}
      </Box>
    </Box>
  );
}
