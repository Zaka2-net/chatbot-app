"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Dropzone from "@/components/Dropzone";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePdfContext } from "../contexts/PdfContext";

const App = () => {
  const router = useRouter();

  const { pdfFiles, setPdfFiles } = usePdfContext();
  const [isProcessingFile, setIsProcessingFile] = useState<Boolean>(false);

  const onSetFiles = (submittedFiles: File[]) => {
    setIsProcessingFile(true);
    setPdfFiles(submittedFiles);

    // Set a timeout for 2 seconds to mimic server behavior
    setTimeout(() => {
      setIsProcessingFile(false);
      console.log("File Uploaded Successfully");
      router.push("/chat");
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
