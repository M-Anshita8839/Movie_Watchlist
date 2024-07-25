import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const apiKey = "7069db553e942d6ab0880a23186fc423";

  const handleSearch = (e) => {
    setInput(e.target.value);
    const query = e.target.value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&query=${query}`;

    axios
      .get(apiUrl)
      .then((res) => {
        setResult(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setResult([]);
      });
  };

  return (
    <Box>
      <SearchIcon />
      <input
        style={{ border: "2px solid" }}
        value={input}
        onChange={handleSearch}
        placeholder="Search"
      />

      <ul style={{ listStyle: "none", maxWidth: "50%" }}>
        {result.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
    </Box>
  );
};

export default SearchBar;
