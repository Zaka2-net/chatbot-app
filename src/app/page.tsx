"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Dropzone from "@/app/Dropzone";
import LoadingSpinner from "@/components/LoadingSpinner";

const App = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessingFile, setIsProcessingFile] = useState<Boolean>(false);

  const onSetFiles = (submittedFiles: File[]) => {
    setIsProcessingFile(true);
    setFiles(submittedFiles);

    // Set a timeout for 2 seconds to mimic server behavior
    setTimeout(() => {
      setIsProcessingFile(false);
      console.log("File Uploaded Successfully");
      console.log(submittedFiles);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Set to 100% of the viewport height
      }}
    >
      {isProcessingFile ? (
        <LoadingSpinner />
      ) : (
        <Dropzone onSetFiles={onSetFiles}></Dropzone>
      )}
    </Box>
  );
};

export default App;
