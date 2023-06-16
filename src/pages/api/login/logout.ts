import { verify } from "jsonwebtoken";
import cookie, { serialize } from 'cookie';

export default function logoutHandler(req: any, res: any){
const {myTokenName} = req.cookies;

if(!myTokenName){
    return res.status(401).json({error: "no token"})
}
try{
verify(myTokenName, process.env.JWT_SECRET as string);
const token: string | null = null;
const serialized = serialize("myTokenName", token !== null ? token : "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 0,
  path: "/",
});
 res.setHeader("Set-Cookie", serialized); 
res.status(200).json('logout succesfully')
}catch(error){
    res.status(401).json({error: "invalid token"})
}
}