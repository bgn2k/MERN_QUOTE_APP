import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const navigate = useNavigate()
  function routeToHome(){
    navigate('/')
  }
  function calculateDuration() {
    const currentDate = new Date();
    const startDate = new Date(2022, 7); // August is month 7 (0-indexed)
    const differenceInTime = currentDate - startDate;
    const differenceInYears = differenceInTime / (1000 * 3600 * 24) / 365.25; // Convert to years

    return differenceInYears.toFixed(2) + " years"; // Format to 2 decimal places
  }
  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4, display : 'flex', flexDirection : 'column'}}>
      <Card sx={{ padding: 4 }}>
        <CardContent>
          <Avatar
            alt="B Govinda Narendra"
            src="/path-to-your-photo.jpg"
            sx={{ width: 120, height: 120, margin: "auto" }}
          />
          <Typography variant="h4" align="center" gutterBottom>
            B Govinda Narendra
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Software Developer - Karnataka, India
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Email : bgn.cbe@gmail.com, Phone : +916361408476
          </Typography>
          <Divider sx={{ margin: "16px 0" }} />

          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                I’m a developer with expertise in creating modern responsive web
                applications. With a focus on ReactJS and Material-UI, I enjoy
                crafting clean, functional interfaces and writing efficient,
                maintainable code.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Experience</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Senior System Engineer</strong> — Infosys Limited
                <br />
                Aug 2022 - Present ({calculateDuration()})<br />
                Developed and maintained web applications using GraphQL, NodeJS,
                Dynamics365 and Azure Functions. Lead the team by helping them
                in providing and delivering the application with utmost quality
                and performances.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Tech Stacks That I&apos;m Fluent With...
              </Typography>
              <Typography variant="body1" color="textSecondary">
                - React.js, JavaScript, HTML, CSS <br />
                - Material-UI, Styled Components, CSS-in-JS, Bootstrap <br />
                - Node.js, Express, Azure Functions, GraphQL <br />
                - MongoDB, SQL <br />- Git, Agile Development, Responsive Design
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Anything Other Than Coding?</Typography>
              <Typography variant="body1" color="textSecondary">
                I love making videos for YouTube, I basically love the process
                that I undergo in order to publish a video. Scripting, Planning,
                Editing, Rewriting and Restarting. <br />
                I&apos;m a self-taught guitarist and a violinist. I thrive on
                self learning. It takes me a while but I eventually play the
                right note.😇
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button variant="contained"
            onClick={routeToHome}
          >
            Home
          </Button>
    </Container>
  );
};

export default AboutMe;
