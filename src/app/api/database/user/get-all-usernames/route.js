import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
      try {
            const allUsernames = await executeQuery('SELECT username FROM users');
            console.log('All usernames fetched:', allUsernames);
            return NextResponse.json(allUsernames);
      } catch {
            return NextResponse.json('Failed to fetch usernames');
      }
}