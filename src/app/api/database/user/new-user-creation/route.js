import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";


export async function POST(req){
      try {
            const data = await req.json();
            console.log('New User Creation Data: ', data);
            await executeQuery(`
                        CREATE TABLE IF NOT EXISTS users (
                              id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
                              username TEXT NOT NULL UNIQUE,
                              fullname TEXT NOT NULL,
                              password TEXT NOT NULL,
                              email TEXT NOT NULL,
                              contactNumber TEXT NOT NULL
                        );`)
            const response = await executeQuery(
                  `INSERT INTO users (username, fullname, password, email, contactNumber, usertype) VALUES (?, ?, ?, ?, ?,'simple-user');`,
                  [data.username, data.fullname, data.password, data.email, data.contactNumber]
            );
            console.log('User Created:', response);

            return NextResponse.json({message: 'User creation endpoint reached' });
      } catch (error) {
            console.error('Error in New User Creation: ', error);
            return NextResponse.json({message: 'User creation endpoint reached' });
      }
}