import React from 'react';
import Tabs from '@mui/material/Tabs';
import 'animate.css';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


export default function ColorTabs() {
  const [value, setValue] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = (tabValue) => (theme) => ({
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    backgroundColor: value === tabValue ? '#16a34a' : '#15803d',
    borderRadius: '4px',
    flex: 1,
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#16a34a',
      transform: 'scale(1.05)',
    },
    '&.Mui-selected': {
      backgroundColor: '#16a34a',
      transform: 'scale(1.05)',
      color: '#FFFFFF',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#16a34a',
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      height: '80px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      height: '60px',
    },
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="tabs with icons"
        centered
        sx={(theme) => ({
          width: '100%',
          height: '90px',
          backgroundColor: '#15803d',
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFFFFF',
            height: '4px',
          },
          [theme.breakpoints.down('md')]: {
            height: '80px',
          },
          [theme.breakpoints.down('sm')]: {
            height: '60px',
          },
        })}
      >
        <Tab
          value="explora"
          label="Explora"
          icon={<ExploreIcon />}
          iconPosition="start"
          sx={tabStyles('explora')}
        />
        <Tab
          value="aprende"
          label="Aprende"
          icon={<SchoolIcon />}
          iconPosition="start"
          sx={tabStyles('aprende')}
        />
        <Tab
          value="avanza"
          label="Avanza"
          icon={<TrendingUpIcon />}
          iconPosition="start"
          sx={tabStyles('avanza')}
        />
      </Tabs>

      {value === 'explora' && (
        <Box
          sx={(theme) => ({
            padding: 2,
            backgroundColor: '#15803d',
            height: '60vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            [theme.breakpoints.down('md')]: {
              height: '50vh',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              height: 'auto',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              width: '500px',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: 1,
              marginRight: '30px',
              [theme.breakpoints.down('md')]: {
                width: '200px',
              },
              [theme.breakpoints.down('sm')]: {
                width: '90%',
                height: '200px',
                marginTop: '20px',
              },
            })}
          >
            <img
              className="animate__animated animate__fadeIn"
              src="./img/explore.jpg"
              alt="Explora"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              marginLeft: '40px',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
              '@media (max-width: 960px)': {
                fontSize: '18px',
              },
              '@media (max-width: 600px)': {
                fontSize: '16px',
              },
            }}
          >
<h3 
  className="animate__animated animate__bounceIn" 
  style={{
    fontWeight: 700,
    textAlign: 'center',
    fontSize: '50px',
    '@media (max-width: 960px)': {
      fontSize: '40px',
    },
    '@media (max-width: 600px)': {
      fontSize: '30px',
    },
  }}
>
  Explora sin límites
</h3>
<ul 
  className="animate__animated animate__bounceIn" 
  style={{ fontSize: '20px', textAlign: 'justify', listStyleType: 'disc', paddingLeft: '20px' }}
>
  <li>
    Explora cada rincón de nuestra plataforma y descubre los cuestionarios diseñados para ti. Recorre fácilmente nuestros contenidos y vive una experiencia de aprendizaje única. ¡Tu camino hacia el conocimiento comienza aquí!
  </li>
</ul>


          </Box>
        </Box>
      )}

      {value === 'aprende' && (
        <Box
          sx={(theme) => ({
            padding: 2,
            backgroundColor: '#15803d',
            height: '60vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            [theme.breakpoints.down('md')]: {
              height: '50vh',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              height: 'auto',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              width: '500px',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: 1,
              marginRight: '30px',
              [theme.breakpoints.down('md')]: {
                width: '200px',
              },
              [theme.breakpoints.down('sm')]: {
                width: '90%',
                height: '200px',
                marginTop: '20px',
              },
            })}
          >
            <img
              className="animate__animated animate__fadeIn"
              src="./img/explore.jpg"
              alt="Aprende"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              marginLeft: '40px',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
            }}
          >
<h3 
  className="animate__animated animate__bounceIn" 
  style={{ fontWeight: 700, textAlign: 'center', fontSize: '50px' }}
>
  Aprende más
</h3>
<ul 
  className="animate__animated animate__bounceIn" 
  style={{ fontSize: '25px', textAlign: 'justify', listStyleType: 'disc', paddingLeft: '20px' }}
>
  <li>Expande tus conocimientos con nuestros recursos educativos diseñados para ti.</li>
</ul>


          </Box>
        </Box>
      )}

      {value === 'avanza' && (
        <Box
          sx={(theme) => ({
            padding: 2,
            backgroundColor: '#15803d',
            height: '60vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            [theme.breakpoints.down('md')]: {
              height: '50vh',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              height: 'auto',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              width: '500px',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: 1,
              marginRight: '30px',
              [theme.breakpoints.down('md')]: {
                width: '200px',
              },
              [theme.breakpoints.down('sm')]: {
                width: '90%',
                height: '200px',
                marginTop: '20px',
              },
            })}
          >
            <img
              className="animate__animated animate__fadeIn"
              src="./img/avanza.jpg"
              alt="Avanza"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              marginLeft: '40px',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
            }}
          >
              <h3 
  className="animate__animated animate__bounceIn" 
  style={{ fontWeight: 700, textAlign: 'center', fontSize: '50px' }}
>
  Avanza con nosotros
</h3>
<ul 
  className="animate__animated animate__bounceIn" 
  style={{ fontSize: '20px', textAlign: 'justify', listStyleType: 'disc', paddingLeft: '20px' }}
>
  <li>Da el siguiente paso en tu camino. Aprovecha las oportunidades que te ofrecemos.</li>
</ul>


          </Box>
        </Box>
      )}
    </Box>
  );
}


