import { conn } from "@/utils/database";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { password } = body;
  const { id } = query;

  switch (method) {

    case "GET":
      try {
        const text = "SELECT password FROM admin WHERE id = $1";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "Admin not found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
     
        const updatePasswordQuery =
          "UPDATE admin SET password = $1 WHERE id = $2";
        const updatePasswordValues = [password, id]; // Utiliza el valor de `id` obtenido de `query`
        await conn.query(updatePasswordQuery, updatePasswordValues);

        // Eliminar la cookie del token
        res.setHeader(
          "Set-Cookie",
          serialize("myTokenName", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
          })
        );

        return res.status(200).json({ message: "Password updated successfully" });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};

      
    
