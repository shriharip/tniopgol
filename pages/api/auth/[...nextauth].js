import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./../../../lib/mongodb"
import superagent from "superagent";
// import { Client as FaunaClient } from "faunadb"
// import { FaunaAdapter } from "@next-auth/fauna-adapter"

// const client = new FaunaClient({
// secret: process.env.FAUNA_SECRET,
//   scheme: "https",
//   domain: process.env.FAUNA_ENDPOINT,
//   port: 443, 
// })

export default NextAuth({

  secret: process.env.SECRET,

  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  jwt: {
    encryption: true,
    // A secret to use for key generation. Defaults to the top-level `session`.
    secret: process.env.SECRET,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token, maxAge }) {},
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        
        try {
          let res = await superagent.post('https://data.mongodb-api.com/app/data-jjzsy/endpoint/data/beta/action/findOne').send({
            "dataSource": "Cluster0",
            "database": "logpoint",
            "collection": "Users",
            "filter": {
              "userName": credentials.username
            }
          }).set('api-key', process.env.MONGO_KEY).set('Accept', 'application/json');
          let val = JSON.parse(res.text);
          return val['document'];
        } catch (error) {
          console.log(error);
          return null;
        }

        // if (user) {
        // if (credentials.username == 'ganesha') {
        
        //   // Any object returned will be saved in `user` property of the JWT
        //    return {
        //     id: 1,
        //     name: "Ganeshasub",
        //     email: "ganesha@ka.com",
        //     image: "https://www.fillmurray.com/64/64",
        //   }
        // } else {
        //   // If you return null or false then the credentials will be rejected
        //   return null
        //   // You can also Reject this callback with an Error or with a URL:
        //   // throw new Error('error message') // Redirect to error page
        //   // throw '/path/to/redirect'        // Redirect to a URL
        // }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   jwt: ({ token, user }) => {
  //     // first time jwt callback is run, user object is available
  //     if (user) {
  //       token.id = user.id;
  //     }

  //     return token;
  //   },
  //   session: ({ session, token }) => {
  //     if (token) {
  //       session.id = token.id;
  //     }

  //     return session;
  //   },
  // },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#fcce31", // Hex color code
    logo: "http://localhost:3000/Logo@2x.png" // Absolute URL to image
  }

})