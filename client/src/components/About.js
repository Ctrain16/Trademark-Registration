import { Container, Typography } from "@material-ui/core";

function About() {
  return (
    <Container component="main" maxWidth="sm">
      <Typography
        variant="h4"
        style={{
          marginTop: 20,
        }}
      >
        About
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: 20,
        }}
      >
        The CTRC allows you to register for an account, login, view existing
        trademarks, and register your own trademarks.
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: 20,
        }}
      >
        Navigation is handled through the menu. To access the menu click on the
        icon in the top left of your screen.
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: 20,
        }}
      >
        One thing to note is when registering trademarks, two trademarks with
        the same name cannot exist in the same category
      </Typography>

      <Typography
        variant="body1"
        style={{
          marginTop: 20,
        }}
      >
        The system is pretty straightforward and if you have any other questions
        feel free to reach out to me at cmtrainor3@upei.ca
      </Typography>
    </Container>
  );
}

export default About;
