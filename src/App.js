import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MovieComponent from './components/MovieComponent';
import Axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const API_KEY = "ec479189";
const Container = styled.div`
  display:flex;
  flex-direction:column;
`;



const Header = styled.div`
  display:flex;
  justify-content:space-between;
  flex-direction:row;
  background-color:black;
  color:white;
  align-items:center;
  padding:10px;
  font-size:25px;
  font-weight:bold;
  box-shadow:0 3px 6px 0 #555;
`;

const AppName= styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`;


const SearchBox = styled.div`
  display:flex;
  flex-direction:row;
  padding:10px 10px;
  background-color:white;
  border-radius:6px;
  margin-left:20px;
  width:50%;
  align-items:center;
`;

const SearchInput = styled.input`
  color:black;
  font-size:16px;
  font-weight:bold;
  border:none;
  outline:none;
  margin-left:15px
`;

const MovieListContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  padding:30px;
  justify-content:space-evenly;
`;

const Centermsg= styled.div`
  color:#663399;
  font-size:25px;
  font-weight:bold;
  text-align:center;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  
   const particlesLoaded = (container) => {
    console.log(container);
  };

   const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };


  return (
      
      <Container>
      
        <Header>
          <AppName>
           <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 40,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#FF0000",
          },
          links: {
            color: "#A020F0",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 900,
            },
            value: 80,
          },
          opacity: {
            value: 0.9,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
    />
            React Movie App
            </AppName>
            <SearchBox>
                <SearchInput placeholder="Movie Name" value={searchQuery} onChange={onTextChange}/>
            </SearchBox>
        </Header>

        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}/>}
          <MovieListContainer>
          {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : <Centermsg>RESULT SHOWN HERE</Centermsg>}
          </MovieListContainer>
        </Container>
        
  );
}

export default App;