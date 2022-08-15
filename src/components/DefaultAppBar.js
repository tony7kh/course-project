import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const DefaultAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/homepage">Audioplayer</Link>
          </Typography>
          <Button color="primary" variant="contained">
            <Link to="/login">Log In</Link>
          </Button>
          <Button
            sx={{
              ml: 2,
            }}
            color="secondary"
            variant="outlined"
          >
            <Link to="/signup">Sign up</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
