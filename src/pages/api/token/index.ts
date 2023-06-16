import { verify } from "jsonwebtoken";

const JWT_SECRET = `${process.env.JWT_SECRET}`;

export default function profileHandler(req: any, res: any) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }
  try {
    const user = verify(myTokenName, JWT_SECRET);
    console.log(user);
    return res.json({ username: user });
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}
