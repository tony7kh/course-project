 import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom"
import { DriveEtaOutlined } from "@mui/icons-material";
import { connect } from "react-redux";


function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* <Header /> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/homepage">Audioplayer</Link>
          </Typography>
          <Button color="primary" variant="contained">
            <Link to="/login">Log In</Link>
          </Button>
          <Button color="secondary" variant="outlined">
            <Link to="/signup">Sign up</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
