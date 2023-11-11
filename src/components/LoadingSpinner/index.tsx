import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Set to 100% of the viewport height
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
