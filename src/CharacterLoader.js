// src/CharacterLoader.js


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CharacterLoader() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const loadCharacters = () => {
      setLoading(true);
      axios
        .get('https://swapi.dev/api/people/')
        .then((response) => {
          setCharacters(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

  // Filtrar personajes en función del término de búsqueda
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadCharacters(); // Cargar personajes al inicio
  }, []);

  return (
    <Container style={{ backgroundImage: 'url(https://pbs.twimg.com/media/FX3XQUmWYAEv98X.jpg:large)' }} >
      <h1 style={{ textAlign: 'center' }}>Personajes de Star Wars</h1>
      <Grid container alignItems="center" justifyContent="center">
        <TextField
          label="Buscar personajes"
          textColor="white"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: {
      color: 'white',
      fontWeight: 'bold',
    },
            endAdornment: <SearchIcon sx={{ color: 'white' }} />,
            sx: {
              marginBottom: 2,
              '& input': {
                color: 'white',
                '&::placeholder': { // Estilo para el texto de placeholder
                  color: 'rgba(255, 255, 255, 0.7)', // Color del texto de placeholder (puede ajustarse)
                },
              },
              '& .MuiOutlinedInput-notchedOutline': { 
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            },
          }}
          fullWidth
          sx={{
            marginBottom: 2,
            '& input': { color: 'white' }, // Cambia el color del texto a blanco
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, // Cambia el color del borde
          }}
        />
        <Button
          variant="contained"
          onClick={loadCharacters}
          disabled={loading}
          fullWidth
          sx={{
            backgroundColor: 'black', // Cambia el color de fondo del botón a negro
            color: 'white', // Cambia el color del texto del botón a blanco
            '&:hover': { backgroundColor: 'darkgray' }, // Cambia el color de fondo al pasar el mouse por encima
          }}
        >
          {loading ? 'Personajes' : 'Cargar Personajes'}
        </Button>
      </Grid>
      <Grid container spacing={3}>
        {filteredCharacters.map((character, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ minWidth: 275, marginTop: 2 }}>
              <div style={{ padding: '16px' }}>
                <h2>{character.name}</h2>
                <p>
                  <strong>Género:</strong> {character.gender}
                </p>
                <p>
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </p>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CharacterLoader;