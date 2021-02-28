import { Button, ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/Login">
          Login
        </Button>
        <Button component={Link} to="/Signup">
          Sign up
        </Button>
        <Button component={Link} to="/Register">
          Register Trademark
        </Button>
        <Button>View Trademarks</Button>
      </ButtonGroup>
    </div>
  );
}

export default Footer;
