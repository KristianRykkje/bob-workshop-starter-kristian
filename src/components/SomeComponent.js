import React from "react";
import { Typography, Box } from "@mui/material";

function SomeComponent() {
  return (
    <Box py={5} bgcolor="#e8eaf6" borderRadius={3} boxShadow={3} mt={4} px={3}>
      <Typography variant="h6" gutterBottom color="#3f51b5">
        Om Meg
      </Typography>
      <Typography>Eksempeltekst</Typography>
    </Box>
  );
}

export default SomeComponent;
