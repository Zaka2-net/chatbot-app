"use client";
import React, { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Box, Typography } from "@mui/material";

interface DropzoneProps {
  onSetFiles: (files: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onSetFiles }) => {
  const maxFiles = 1;

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      onSetFiles(acceptedFiles);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    accept: { "application/pdf": [".pdf"] }, // Specify the accepted file type
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #cccccc",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "center",
        width: "80%", // Use percentage for responsive width
        height: "60%", // Use percentage for responsive height
        maxWidth: "500px", // Set a maximum width if needed
        maxHeight: "300px", // Set a maximum height if needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:focus": {
          outline: "none",
        },
      }}
      component="div"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop the file here ...</Typography>
      ) : (
        <Typography variant="body1">
          Drag and drop a PDF, or click to select a file
        </Typography>
      )}
    </Box>
  );
};

export default Dropzone;
