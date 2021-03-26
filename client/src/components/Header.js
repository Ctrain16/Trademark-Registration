import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({ loggedIn, onClick }) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const menuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={menuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={menuClose}
          >
            <MenuItem
              onClick={() => {
                menuClose();
                history.push("/");
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                menuClose();
                history.push("/Register");
              }}
            >
              Register Trademark
            </MenuItem>
            <MenuItem
              onClick={() => {
                menuClose();
                history.push("/Trademarks");
              }}
            >
              View Trademarks
            </MenuItem>
            <MenuItem
              onClick={() => {
                menuClose();
                history.push("/About");
              }}
            >
              About
            </MenuItem>
          </Menu>

          <Typography variant="h5" className={classes.title}>
            CTRC
          </Typography>
          {loggedIn ? (
            <Button
              variant="outlined"
              size="small"
              color="default"
              onClick={onClick}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="default"
              variant="contained"
              component={Link}
              to="/Login"
              onClick={onClick}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
