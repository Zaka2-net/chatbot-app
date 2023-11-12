import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import PdfPreview from "../../components/PdfPreview";

const SplitScreenLayout: React.FC = () => {
  return (
    <Container style={{ height: "98vh" }}>
      <div style={{ display: "flex", height: "98vh" }}>
        {/* 98vh is to compensate for the paddings to eliminate the vertical scroll */}
        {/* Left side */}
        <div
          style={{
            flex: 1,
            marginRight: "16px",
          }}
        >
          <Paper elevation={1} style={{ height: "100%" }}>
            <Typography variant="h6" style={{ padding: "16px" }}>
              Chat Screen
            </Typography>
          </Paper>
        </div>
        {/* Right side */}
        <div style={{ flex: 1 }}>
          <Paper elevation={1} style={{ height: "100%", overflow: "auto" }}>
            <PdfPreview></PdfPreview>
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default SplitScreenLayout;
