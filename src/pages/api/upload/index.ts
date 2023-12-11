import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { v4 as generateUniqueCode } from "uuid";

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const config = { api: { bodyParser: false } };

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing the form data." });
      return;
    }

    const file = files?.file && files?.file[0];

    if (!file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    // Read the file and get its content
    fs.readFile(file.filepath, (readError, fileContent) => {
      if (readError) {
        res.status(500).json({ error: "Error reading file" });
        return;
      }

      // Set parameters for S3 upload
      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: generateUniqueCode(), // Generate unique file name
        Body: fileContent,
      };

      if (file.mimetype) {
        params.ContentType = file.mimetype;
      }

      // Upload file to S3
      s3.upload(params, (uploadError, data) => {
        if (uploadError) {
          console.error("uploadError", uploadError);

          res.status(500).json({
            error: "Error uploading file",
            details: uploadError.message,
          });

          return;
        }

        res
          .status(200)
          .json({ message: "File uploaded successfully", data: data.Location });
      });
    });
  });
};

export default uploadHandler;
