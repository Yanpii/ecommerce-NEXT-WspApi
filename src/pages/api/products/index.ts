
import { NextApiRequest, NextApiResponse } from "next";
import {conn} from 'src/utils/database';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM product";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } 
      catch (err: any) {
        return res.status(400).json({ error: err.message });
      }

      case "POST":
        try {
          const {title, description, image, price, stock} = body;

          const query = "INSERT INTO product (title, description, image, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING * ";
          const values = [title, description, image, price, stock];
          const response = await conn.query(query, values );
          
          return res.status(200).json(response.rows[0]);
        } 
        catch (err: any) {
          return res.status(400).json({ error: err.message });
        }
  }
};
