import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM product WHERE id = $1";
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rows.lenth === 0)
          return res.status(404).json({ mesage: "Product not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }

    case "PUT":
      try {
        const { title, description, image, price, stock } = body;
        const text =
          "UPDATE product SET title = $1, description= $2, image= $3, price = $4, stock= $5 WHERE id = $6 RETURNING *";
        const values = [title, description, image, price, stock, query.id];
        const result = await conn.query(text, values);

        if (result.rows.lenth === 0)
          return res.status(404).json({ mesage: "Product not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM product WHERE id = $1 RETURNING *";
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ mesage: "Product not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }

    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};
