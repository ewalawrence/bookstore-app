import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import { db } from "./db";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    // let you use the customized page
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          credentials: { 
            email: { label: "email", type: "text", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            //if the credentials email is empty or the password is empty
            if(!credentials?. email || !credentials?.password) {
                return null;
            }
            //check the user into the db
            const existingUser = await db.user.findUnique({
                where: {email: credentials?.email}
            });
            //if there is no existing user return null
            if(!existingUser) {
                return null;
            }
            //if the password doesn't match return null
            // since the password is encripted we use compare coming from bcrypt
            const passwordMatch = await compare(credentials.password, existingUser.password);
            //if the password doesn't exist return null
            if(!passwordMatch) {
                return null;
            }
            //after doing all the checks we need to return the following
            return {
                id: `${existingUser.id}`,
                username: existingUser.username,
                email: existingUser.email
            }
          }
        })
      ],
      callbacks: {
        async jwt({token, user}) {
            //if user has a value, return all the value
            if(user){
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        },
      }
} 