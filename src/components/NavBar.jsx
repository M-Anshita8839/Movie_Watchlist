import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthUser } from "../AppRouter";
// import { InputAdornment, TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function DrawerAppBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthUser);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Box sx={{ display: "flex", marginTop: "100px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "black" }}>
        <Toolbar>
          <Typography
            onClick={() => navigate("/home")}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", color: "white" },
            }}
          >
            Movies
          </Typography>
          <Box></Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={() => navigate("/home")} sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button
              onClick={() => navigate("/watchlist")}
              sx={{ color: "#fff" }}
            >
              Watchlist
            </Button>
            <Button onClick={handleLogout} sx={{ color: "#fff" }}>
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
