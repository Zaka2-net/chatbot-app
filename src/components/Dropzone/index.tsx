"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone, FileRejection } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";
import { usePdfContext } from "@/contexts/PdfContext";

const Dropzone: React.FC = () => {
  const router = useRouter();
  const maxFiles = 2;
  const { pdfFiles, setPdfFiles } = usePdfContext();
  const [isProcessingFile, setIsProcessingFile] = useState<Boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // TODO: handle file rejections
      setIsProcessingFile(true);
      const modifiedAcceptedFiles = acceptedFiles.map((file) => {
        return {
          pdfFile: file,
          url: URL.createObjectURL(file),
        };
      });
      setPdfFiles(modifiedAcceptedFiles);

      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          router.push("/chat");
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsProcessingFile(false);
        }
      }
    },
    [setPdfFiles, setIsProcessingFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    accept: { "application/pdf": [".pdf"] }, // Specify the accepted file type
  });

  if (isProcessingFile) {
    return <LoadingSpinner />;
  }

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
