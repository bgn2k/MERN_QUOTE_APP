import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: "center", p: 2, backgroundColor: "#f4f4f4" }}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
      Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
      </Typography>
    </Box>
  );
}

export default Footer;
