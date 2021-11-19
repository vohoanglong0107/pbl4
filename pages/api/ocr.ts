// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import formidable from "formidable";
import backendAPI from "../../utils/backendAPI";
import fs from "fs";
import FormData from "form-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // console.log(req);
    const data: { fields: formidable.Fields; files: formidable.Files } =
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

    // read file from the temporary path
    console.log(data);
    const formData = new FormData();
    formData.append(
      "data",
      // @ts-ignore
      fs.createReadStream(data?.files?.data.filepath),
      // @ts-ignore
      data?.files?.data.originalFilename
    );
    const backendResponse = await backendAPI.post("/ocr", formData, {
      headers: formData.getHeaders(),
    });
    res.status(201).json(backendResponse.data);
  } else res.status(405).json({ detail: "Method Not Allowed" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
