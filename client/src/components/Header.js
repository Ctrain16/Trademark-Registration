import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightButton: {
    marginRight: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => history.push("/")}
          >
            <HomeIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            CTRC
          </Typography>
          <Button color="inherit" size="small" component={Link} to="/Register">
            Register Trademark
          </Button>
          <Button
            className={classes.rightButton}
            color="inherit"
            size="small"
            component={Link}
            to="/Trademarks"
          >
            View Trademarks
          </Button>
          <Button
            color="default"
            variant="contained"
            component={Link}
            to="/Login"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
