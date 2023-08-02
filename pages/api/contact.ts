import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      const db = await connectToDatabase();

      const collection = db.collection("contacts");

      await collection.insertOne({ name, email, message });

      res
        .status(201)
        .json({ message: "Contact form data saved successfully." });
    } catch (error) {
      console.error("Error saving contact form data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the data." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
};

export default handler;
