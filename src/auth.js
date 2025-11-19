import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

async function getUsernameAndPasswordChecked(username, password) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/user/login`, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
      }).then(res => res.json());
      if (response === 'Successful') {
            return true;
      } else {
            return false;
      }
}     

export const { handlers, auth, signIn, signOut } = NextAuth({
      providers: [
      CredentialsProvider({
            name: "Credentials",
            credentials: {
                  username: { label: "Username", type: "text" },
                  password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                  const { username, password } = credentials;
                  if(username && password){
                        const correct = await getUsernameAndPasswordChecked(username, password);

                        if (correct === true) {
                              return {
                                    id: 1,
                                    name: username,
                              };
                        }
                  }

                  return null;
            }
      })
      ]
});
