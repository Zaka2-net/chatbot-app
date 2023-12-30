import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
let s3Client: S3Client;

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_REGION) {
  // Configure the AWS S3 client
  s3Client = new S3Client({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
  });
}

const uploadFileToS3 = async (file: File, buffer: Buffer) => {
  try {
    const key = file.name;

    if (!key) {
      throw new Error("File has no name");
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    };

    const uploadCommand = new Upload({ client: s3Client, params: params });

    const result = await uploadCommand.done(); // Waits for the upload to finish

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
  } catch (err) {
    console.error({
      message: "Error uploading file to S3",
      error: err,
    });
  }
};

export { uploadFileToS3 };
