import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM phone WHERE id = $1";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "Phone not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const { number } = body;
        const text = "UPDATE phone SET number = $1 RETURNING *";
        const values = [number];
        const result = await conn.query(text, values);

        if (result.rows.lenth === 0)
          return res.status(404).json({ mesage: "Phone not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }

    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};
