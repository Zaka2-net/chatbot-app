"use client";
import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Dropzone from "@/components/Dropzone";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { usePdfContext } from "../contexts/PdfContext";

const App = () => {
  const router = useRouter();

  const { pdfFiles, setPdfFiles } = usePdfContext();
  const [isProcessingFile, setIsProcessingFile] = useState<Boolean>(false);
  const { user, error, isLoading } = useUser();

  console.log("user", user)

  const onSetFiles = useCallback(async (submittedFiles: File[]) => {
    setIsProcessingFile(true);
    setPdfFiles(submittedFiles);

    for (const file of submittedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        console.log("File Uploaded Successfully");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("File uploaded successfully:", result);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsProcessingFile(false);
      }
    }
  }, []);

  if (!user) {
    return <a href="/api/auth/login">Login</a>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Set to 100% of the viewport height
      }}
    >
      <a href="/api/auth/logout">Logout</a>
      
      {isProcessingFile ? (
        <LoadingSpinner />
      ) : (
        <Dropzone onSetFiles={onSetFiles}></Dropzone>
      )}
    </Box>
  );
};

export default App;
