import React from "react";
import photo from "../assets/Profile Picture_Edited.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const navigate = useNavigate();

  function routeToHome() {
    navigate("/");
  }

  function calculateDuration() {
    const currentDate = new Date();
    const startDate = new Date(2022, 7); // August 2022 (month 7 as 0-indexed)
    const differenceInTime = currentDate - startDate;
    const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 365.25); // Convert to years
    return differenceInYears.toFixed(1) + " years"; // Format to 1 decimal place
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
        marginBottom: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ padding: 4, width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Avatar
              alt="B Govinda Narendra"
              src={photo}
              sx={{ width: 120, height: 120 }}
            />
          </Box>
          <Typography variant="h4" align="center" gutterBottom>
            B Govinda Narendra
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 1 }}
          >
            Software Developer - Karnataka, India
          </Typography>
          <Typography variant="subtitle2" align="center" color="textSecondary">
            Email: bgn.cbe@gmail.com | Phone: +916361408476
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <a
              href="https://github.com/bgn2k"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GitHubIcon fontSize="medium" />
            </a>
            <a
              href="https://www.linkedin.com/in/b-govinda-narendra-89637a224/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <LinkedInIcon fontSize="medium" />
            </a>
            <a
              href="https://www.instagram.com/bgovindnaren/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <InstagramIcon fontSize="medium" />
            </a>
            <a
              href="https://www.youtube.com/@bgovindnaren"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <YouTubeIcon fontSize="medium" />
            </a>
          </Box>

          <Divider sx={{ margin: "16px 0" }} />

          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                About Me
              </Typography>
              <Typography variant="body1" color="textPrimary" paragraph>
                I’m an open-source software developer with expertise in creating
                modern, responsive web applications. With a focus on frontend
                and backend, I enjoy crafting clean, functional interfaces and
                writing efficient and scalable code.
              </Typography>
            </Grid>

            <Divider sx={{ margin: "16px 0" }} />

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Experience
              </Typography>
              <Typography variant="body1" color="textPrimary" paragraph>
                <strong>Senior System Engineer</strong> — Infosys Limited
                <br />
                Aug 2022 - Present ({calculateDuration()})
                <br />
                Developed and optimized APIs with GraphQL, Node.js, CosmosDB,
                Azure Service Bus, and Azure Functions.
                <br />
                Implemented a custom mocking method that enhances PR reviews,
                enabling testing without live entity connections.
                <br />
                Led the team to deliver high-quality, performant applications.
              </Typography>
            </Grid>

            <Divider sx={{ margin: "16px 0" }} />

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Tech Stacks
              </Typography>
              <List sx={{ pl: 2 }}>
                <ListItem disableGutters>
                  <ListItemText primary="ReactJS, JavaScript, HTML, CSS" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Material-UI, Styled Components, Bootstrap" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="NodeJS, Express, GraphQL, Azure Service Bus, Azure Functions" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="MongoDB, SQL" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Git, Agile Development, Responsive Web Design, UI/UX" />
                </ListItem>
              </List>
            </Grid>

            <Divider sx={{ margin: "16px 0" }} />

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Other Interests
              </Typography>
              <Typography variant="body1" color="textPrimary">
                I love creating videos for YouTube and enjoy the entire process:
                scripting, planning, editing, and refining.
                <br />
                Additionally, I&apos;m a self-taught guitarist and violinist,
                constantly learning and enjoying the journey to hit the right
                notes.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        onClick={routeToHome}
        sx={{ mt: 4, alignSelf: "center" }}
      >
        Home
      </Button>
    </Container>
  );
};

export default AboutMe;
