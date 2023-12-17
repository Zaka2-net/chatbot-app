"use client";
import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import PdfPreview from "../../components/PdfPreview";
import Chatbot from "@/components/Chatbot";

const SplitScreenLayout: React.FC = () => {
  return (
    <Container style={{ height: "98vh" }}>
      <div style={{ display: "flex", height: "98vh" }}>
        {/* 98vh is to compensate for the paddings to eliminate the vertical scroll */}
        {/* Left side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            marginRight: "16px",
          }}
        >
          <Paper
            elevation={1}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1,
              overflow: "auto",
            }}
          >
            <Chatbot></Chatbot>
          </Paper>
        </div>
        {/* Right side */}
        <div style={{ flex: 1 }}>
          <Paper elevation={1} style={{ height: "100%", overflow: "auto" }}>
            <PdfPreview />
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default SplitScreenLayout;
