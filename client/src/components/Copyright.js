import { Typography } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Cal Trainor "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
