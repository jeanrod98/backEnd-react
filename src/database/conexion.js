import { ServerErrorMessage } from 'msal/lib-commonjs/error/ServerError'
import {config} from 'dotenv'
import sql from 'mssql';

config();

const dbSettings = {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD, 
    server: "localhost",
    database: "TiendaVeicorOnline",
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}
//conexion a sql 
export async function getConnection (){
    try {
        
        const pool = await sql.connect(dbSettings);
        // const resultado = await pool.request().query('SELECT 1');
        // console.log(resultado);

        return pool;

    } catch (error) {
        console.log(error);
    }
}

export {sql};