import React, { useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import fondo from "../api/assets/fondo.jpg";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#156c19",
    },
  },
});

const SignIn = () => {
  const { login } = useContext(UserContext); // Obtener el método `login` del contexto
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token
        login(data.token, data.user); // Actualizar el contexto de usuario

        // Redirigir según el rol
        if (data.user.rol === "Administrador") {
          navigate("/reports");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("Error en SignIn:", err);
      alert("Hubo un error al iniciar sesión");
    }
  };

  return (
    <ThemeProvider theme={theme}> {/* Aquí envolvemos el componente en ThemeProvider */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Fondo blanco translúcido
            zIndex: 1,
          },
        }}
      >

        <Grid
          container
          component="main"
          sx={{
            height: "80vh",
            width: "90vw",
            maxWidth: "1200px",
            margin: "auto",
            boxShadow: 3,
            borderRadius: 2,
            zIndex: 2, 
            backgroundColor: "#d1d5d1", // Fondo blanco para el contenedor #ffffff
          }}
        >

          {/* Left-side background */}
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: `url(${fondo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
            }}
          />

          {/* Right-side form */}
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            sx={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "green.500" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "green.800", fontWeight: "bold" }}
                >
                  Iniciar sesión
                </Typography>
              </Box>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" sx={{ color: "green.600" }} />}
                  label="Recuerdame"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "primary.main", // Usa el color primario definido en el tema
                    color: "white",
                    ":hover": { bgcolor: "primary.dark" }, // Cambio de color en hover
                  }}
                >
                  Iniciar sesión
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" sx={{ color: "green.800" }}>
                      Olvidaste tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={RouterLink}  // Usa RouterLink para la navegación
                      to="/signup"  // La ruta de la página de registro
                      variant="body2"
                      sx={{ color: "green.800" }}
                    >
                      {"No tienes una cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 3 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tu Sitio Web
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default SignIn;