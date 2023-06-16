
import {NextApiRequest, NextApiResponse} from 'next';
import {conn} from 'src/utils/database';

export default async(req: NextApiRequest, res: NextApiResponse) => {
 
const response = await conn.query('SELECT NOW()')
console.log(response.rows)

  return res.json({
    message: 'pong'})

}

