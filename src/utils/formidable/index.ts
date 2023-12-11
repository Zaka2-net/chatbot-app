import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import { NextApiRequest } from "next";

// Promisify formidable form.parse
const parseForm = (
  req: NextApiRequest
): Promise<{ files: formidable.Files; fields: formidable.Fields }> => {
  const form = formidable();

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export { parseForm };
