import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import fondo from "../api/assets/fondo.jpg";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

// Definición del tema
const theme = createTheme({
  palette: {
    primary: {
      main: "#156c19",
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" sx={{ color: "green.800" }}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignUp = () => {
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
            zIndex: 2, // Asegura que este contenido esté sobre el overlay
            backgroundColor: "#ffffff", // fondo blanco #ffffff
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
                  <PersonAddOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "green.800", fontWeight: "bold" }}
                >
                  Regístrate
                </Typography>
              </Box>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Nombre Completo"
                  name="fullName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "primary.main",
                    color: "white",
                    ":hover": { bgcolor: "primary.dark" },
                  }}
                >
                  Regístrate
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component={RouterLink}
                      to="/"
                      variant="body2"
                      sx={{ color: "green.800" }}
                    >
                      {"¿Ya tienes una cuenta? Inicia sesión"}
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

export default SignUp;
