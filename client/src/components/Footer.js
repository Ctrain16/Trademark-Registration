import { Typography, Grid, Link } from "@material-ui/core";
import { useHistory } from "react-router";

function Footer() {
  const history = useHistory();

  return (
    <div className="footer">
      <Grid
        style={{
          marginTop: 60,
        }}
        container
        direction="column"
        justify="center"
      >
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            history.push("./About");
          }}
          style={{
            marginBottom: 20,
          }}
        >
          Help
        </Link>
        <Typography variant="body2" color="textSecondary" align="center">
          {"~ Cal Trainor "}
          {new Date().getFullYear()}
          {" ~"}
        </Typography>
      </Grid>
    </div>
  );
}

export default Footer;
