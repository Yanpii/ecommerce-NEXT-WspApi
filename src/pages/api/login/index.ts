import { conn } from "@/utils/database";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function loginHandler(req: any, res: any){

  const {username, password} = req.body

  try {
    const client = await conn.connect();
    const query = 'SELECT * FROM admin WHERE username = $1 AND password = $2';
    const values = [username, password];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      
      const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      return res.status(200).json({ message: "Login successful." });


    } else {
      // Usuario o contraseña incorrectos
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    client.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

