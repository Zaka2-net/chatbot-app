import { uploadFileToS3 } from "@/utils/aws";
import { extractTextFromDocument } from "@/utils/google-cloud";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const handler = async (request: NextRequest) => {
  try {

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false }); // TODO: test this
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extracted_text = await extractTextFromDocument(buffer);

    const s3_location = await uploadFileToS3(file, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      s3_location: s3_location,
      extracted_text: extracted_text,
    });
  } catch (error) {
    console.error({
      message: "Error uploading file",
      error: error,
    });

    throw error;
  }
};

// Require Authentication
// export const POST = handler
export const POST = withApiAuthRequired(handler);
