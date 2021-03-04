import { Typography, Box } from "@material-ui/core";

function Footer() {
  return (
    <div className="footer">
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"~ Cal Trainor "}
          {new Date().getFullYear()}
          {" ~"}
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
