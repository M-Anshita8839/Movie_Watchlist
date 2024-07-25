import axios from "axios";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AuthUser } from "../AppRouter";
const apiUrl = "https://api.themoviedb.org/3/trending/movie/day";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDY5ZGI1NTNlOTQyZDZhYjA4ODBhMjMxODZmYzQyMyIsIm5iZiI6MTcxOTMwNjk4MS4xMDU0MzcsInN1YiI6IjY2N2E4NzgwNDZmZmI4YTg5ZDNiNTk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rQZzBt-EW2HRH2KaHp33tPU0mfPDFwU7VQvpjy3KTLY";
const language = "en-US";

const Home = () => {
  const { username } = useContext(AuthUser);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    params: {
      language: language,
    },
  };
  const getMovies = () => {
    axios
      .get(apiUrl, config)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getMovies();
  });

  const handleClick = (movie) => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (
      !watchlist.some((item) => {
        item.id === movie.id;
      })
    ) {
      watchlist.push(movie);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };
  return (
    <>
      <NavBar />
      {/* <h1>hello</h1> */}
      <Box>
        <Typography variant="h5">Welcome {username}!</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <SearchBar />
      </Box>
      <Box>
        <Typography variant="h5"></Typography>
      </Box>
      <br />
      <Box>
        <Typography sx={{ marginBottom: "20px" }} variant="h3">
          Popular Movies List
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "20px" }} />
      {movies.map((item) => {
        return (
          <>
            <Box sx={{ display: "inline-block" }}>
              <Card
                key={item.id}
                sx={{ maxWidth: 500, marginBottom: "30px", marginLeft: "20px" }}
              >
                <CardMedia
                  onClick={() => navigate(`/details/${item.id}`)}
                  component="img"
                  height="194"
                  image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="Paella dish"
                />
                <CardHeader title={item.title} />
                <CardActions>
                  <Button
                    onClick={() => handleClick(item)}
                    variant="contained"
                    sx={{ backgroundColor: "black" }}
                  >
                    +
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default Home;
