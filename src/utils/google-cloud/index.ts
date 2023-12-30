import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { Readable } from "stream";
import fs from "fs";

const extractTextFromDocument = async (
  fileContent: Buffer
): Promise<string> => {
  try {
    const projectId = "inner-analyzer-144313";
    const location = "us"; // e.g., 'us'
    const processorId = "c43944c872459872";

    const encodedCredentials = process.env.GCP_CREDENTIALS;
    if (!encodedCredentials) {
      throw new Error("No GCP credentials found");
    }

    const decodedCredentials = JSON.parse(
      Buffer.from(encodedCredentials, "base64").toString()
    );

    const client = new DocumentProcessorServiceClient({
      credentials: decodedCredentials,
    });

    const processorPath = client.processorPath(
      projectId,
      location,
      processorId
    );

    // Read the file into memory
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
