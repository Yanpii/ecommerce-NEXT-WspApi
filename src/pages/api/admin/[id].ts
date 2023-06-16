import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM admin WHERE id = $1";
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
        const { username, password } = body;

        // Verificar si el password ingresado coincide con el de la base de datos
        const checkPasswordQuery = "SELECT password FROM admin WHERE id = $1";
        const checkPasswordValues = [id];
        const checkPasswordResult = await conn.query(
          checkPasswordQuery,
          checkPasswordValues
        );
        if (checkPasswordResult.rows.length === 0) {
          return res.status(404).json({ message: "Admin not found" });
        }

        const dbPassword = checkPasswordResult.rows[0].password;

        if (password !== dbPassword) {
          return res.status(401).json({ message: "Invalid password" });
        }

        // Actualizar el nombre de usuario
        const updateUsernameQuery =
          "UPDATE admin SET username = $1 WHERE id = $2";
        const updateUsernameValues = [username, id];
        await conn.query(updateUsernameQuery, updateUsernameValues);

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

        return res.status(200).json({ message: "Admin updated successfully" });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};
