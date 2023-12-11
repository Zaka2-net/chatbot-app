import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { Readable } from "stream";
import fs from "fs";

const extractTextFromDocument = async (filePath: string): Promise<string> => {
  try {
    const projectId = "inner-analyzer-144313";
    const location = "us"; // e.g., 'us'
    const processorId = "c43944c872459872";
    const client = new DocumentProcessorServiceClient();

    const processorPath = client.processorPath(
      projectId,
      location,
      processorId
    );

    // Read the file into memory
    const fileContent = fs.readFileSync(filePath);
    const readableStream = new Readable();
    readableStream.push(fileContent);
    readableStream.push(null);

    // TODO: Adjust MIME type based on your file type
    // TODO: Validate MIME type as supported by Document AI
    const request = {
      name: processorPath,
      rawDocument: {
        content: fileContent,
        mimeType: "application/pdf",
      },
    };

    const [result] = await client.processDocument(request);

    console.log("full document processing result", { result });

    const text = result.document?.text;

    return text || "";
  } catch (error) {
    console.error({
      message: "Failed to process document",
      error,
    });

    throw error;
  }
};

export { extractTextFromDocument };
