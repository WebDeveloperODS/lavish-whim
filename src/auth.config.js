export const authConfig = {
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
            signIn: '/portal',
            signOut: '/portal',
      },
      session:{
            strategy: 'jwt',
            maxAge:  3 * 60 * 60, // 3 hours
            updateAge:  60 * 60, // 1 hour
      },
      callbacks:{
            session: async ({session, token}) => {
                  if(token){
                        session.user = {
                              ...session.user,
                              name: token.name,
                        }
                  }
                  return session;
            },
            jwt: async ({token, user}) => {
                  if(user){
                        token.name = user.name;
                  }
                  return token
            },
            authorized({auth, request: {nextUrl}}){
                  const isLoggedIn = auth?.user ? true : false;
                  const isOnLoginPage = nextUrl.pathname === '/portal';
                  const isOnPortal = nextUrl.pathname.startsWith('/portal/dashboard');

                  if(!isLoggedIn && !isOnLoginPage){
                        return Response.redirect('/portal');
                  }
                  if(isLoggedIn && (isOnLoginPage || isOnPortal)){
                        return Response.redirect('/portal/dashboard');
                  }

                  if(isLoggedIn){
                        return true;
                  }

                  if(isOnPortal){
                        return isLoggedIn
                  }

                  return true;
            }
      },
      providers: []
}