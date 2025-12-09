import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function PUT(req){
      try {
            const {username} = await req.json();
            // console.log(username);
            const user = await executeQuery('SELECT username, usertype, fullname FROM users WHERE username=?;',[username]);
            // console.log(user);
            if(user.length > 0){
                  return NextResponse.json(user[0]);
            }    
            return NextResponse.json('No User Found', {status: 404});
      } catch (error) {
            console.error('Error fetching user:', error);
            return NextResponse.json('Internal Server Error', {status: 500});
      }
}