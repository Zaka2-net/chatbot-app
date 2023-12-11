"use client";
// This context needs to change to hold string values of the locations of pdfs on the s3 bucket instead of an array of files. Unless the pdf is in the project's public folder, we can't render it since the browser doesn't share the full path for security purposes.
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PdfContextProps {
  pdfFiles: File[] | null;
  setPdfFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

const PdfContext = createContext<PdfContextProps | undefined>(undefined);

export const PdfProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pdfFiles, setPdfFiles] = useState<File[] | null>(null);

  return (
    <PdfContext.Provider value={{ pdfFiles, setPdfFiles }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdfContext = () => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error("usePdfContext must be used within a PdfProvider");
  }
  return context;
};
