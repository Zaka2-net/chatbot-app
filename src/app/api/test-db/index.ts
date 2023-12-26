import mongoClient from "@/utils/mongodb/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await mongoClient;
    const db = client.db("mongo_db_1");

    // Example operation: list collections
    const collections = await db.listCollections().toArray();
    res.status(200).json({ collections });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({ error: message });
  }
}
