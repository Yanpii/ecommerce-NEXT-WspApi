import {Pool} from 'pg';

let conn: any;

if(!conn){
    conn = new Pool({
    user: `${process.env.USER_PG}`,
    host: `${process.env.HOST_PG}`,
    database: `${process.env.NAME_DATABASE}`,
    password: `${process.env.PASSWORD_DATABASE}`,
    port: parseInt(`${process.env.PORT_DATABASE}`, 10)
})
}
export {conn};