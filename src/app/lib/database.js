'use server'
import mysql from 'mysql2/promise';
let pool = null;

const connectDb = async () => {
  if(!pool){
    try {
      console.log('Creating new DB pool connection');
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        timezone: 'Z',
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 30000,
      })

      const conn = await pool.getConnection()
      conn.release();
      // console.log(conn)
    } catch (error) {
      console.log('Unable to connect to database')
      pool = null
      throw error  
    }
  } 
  return pool
}

const executeQuery = async (query, params) => {
  try{
    const db = await connectDb();
    // console.log('Executing Query:', query, params)
    const [rows] = await db.execute(query,params)
    return rows;
  } catch (error) {
    // console.error("QUERY ERROR:", error);
    throw error;
  }
}

export default executeQuery