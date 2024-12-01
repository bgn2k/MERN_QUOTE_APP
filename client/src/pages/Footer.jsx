import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: "center", p: 2, backgroundColor: "black" }}>
      <Typography variant="body2" color="white" gutterBottom>
      Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
      </Typography>
    </Box>
  );
}

export default Footer;
