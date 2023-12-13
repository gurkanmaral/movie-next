import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";




export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {

        password: { label: "Password", type: "password" },
        email: {
          label: "Email",
          type: "text",
        },
      },
      async authorize(credentials) {

        await connectToDB();
       
        if (!credentials) {
          throw new Error("Credentials are undefined");
        }
        try {
          let user;

          if (credentials.email) {
            // Check if the user exists with the given email
            user = await User.findOne({ email: credentials.email });

            if (!user) {
              // If the user doesn't exist, create a new user in the database
              throw new Error("User not found");
            } else {
              // Check password for existing users
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (!isPasswordCorrect) {
               return null
              }
            }
          }

          return user;
        } catch (error:any) {
          console.log(error)
        }
      },
    }),
  ],

});

export { handler as GET, handler as POST };