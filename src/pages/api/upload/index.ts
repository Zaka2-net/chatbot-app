import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToS3 } from "@/utils/aws";
import { extractTextFromDocument } from "@/utils/google-cloud";
import { parseForm } from "@/utils/formidable";

export const config = { api: { bodyParser: false } };

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { files } = await parseForm(req);
    const file = files?.file && files?.file[0];

    if (!file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const extractedText = await extractTextFromDocument(file.filepath);

    const s3Location = await uploadFileToS3(file);

    res.status(200).json({
      message: "File uploaded successfully",
      s3_location: s3Location,
      extracted_text: extractedText,
    });
  } catch (error) {
    console.error("Error handling request", error);
    res.status(500).json({ error: "Error handling request" });
  }
};

export default uploadHandler;
