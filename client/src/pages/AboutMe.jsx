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
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const navigate = useNavigate();

  function routeToHome() {
    navigate(-1);
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
              <Tooltip title="GitHub" arrow>
                <GitHubIcon fontSize="medium" />
              </Tooltip>
            </a>
            <a
              href="https://www.linkedin.com/in/b-govinda-narendra-89637a224/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="LinkedIn" arrow>
              <LinkedInIcon fontSize="medium" />
              </Tooltip>
            </a>
            <a
              href="https://www.instagram.com/bgovindnaren/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="Instagram" arrow>
              <InstagramIcon fontSize="medium" />
              </Tooltip>
            </a>
            <a
              href="https://www.youtube.com/@bgovindnaren"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="YouTube" arrow>
              <YouTubeIcon fontSize="medium" />
              </Tooltip>
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
                Implemented a common custom mocking method that enhances
                PR&apos;s code coverage, enabling testing without live entity
                connections. And thus reducing stress on the acutal server
                everytime test scripts are ran.
                <br />I led my team in building applications that were both
                powerful and easy to use, combining clean design with complex
                functionality to ensure they were user-friendly and efficient.
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
                  <ListItemText primary="JavaScript, HTML, CSS, JAVA, Typescript" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="ReactJS, NodeJS, Express, GraphQL, Azure Service Bus, Azure Functions, SpringBoot" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="MongoDB, SQL" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Material-UI, Styled Components, Bootstrap" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Git, Agile Development, Responsive Web Design, UI/UX, Data Structures & Algorithms" />
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
                I love creating YouTube videos and I enjoy the entire process of
                scripting, planning, editing, and refining.
                <br />
                Additionally, I&apos;m a self-taught guitarist and violinist,
                constantly learning and enjoying the journey to hit the right
                notes 😅.
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
