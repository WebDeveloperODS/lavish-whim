import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    console.log('Creating Users Table');
    const response = await executeQuery('CREATE TABLE IF NOT EXISTS users (id CHAR(36) NOT NULL DEFAULT (UUID()), name TEXT NOT NULL, email TEXT NOT NULL, PRIMARY KEY (id));', []);
    console.log('DB Response:', response);
    return NextResponse.json('Successful')
  } catch (error) {
    console.error('DB Error',error);
    return NextResponse.json('Unsuccessful')
  } 
}