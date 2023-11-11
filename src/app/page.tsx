import React from "react";
import { Box, Typography } from "@mui/material";

const App = () => {
  interface MainText {
    text: string;
  }

  const mainText: MainText = { text: "Hello World" }; // To test typscript funtionality

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Set to 100% of the viewport height
        textAlign: "center",
      }}
    >
      <Typography variant="h2">{mainText.text}</Typography>
    </Box>
  );
};

export default App;
