import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh", //
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
