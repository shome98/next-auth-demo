import { connectToDatabase } from "@/db/connectToDatabase";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password!!!😵");
                }
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) throw new Error("No user found with this email!!!😢");
                    const isValid = user.isPasswordCorrect(credentials.password);
                    if (!isValid) throw new Error("Password is incorrect!!!😵");
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role
                    };
                } catch (error) {
                    console.error("Authentication error: ", error)
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id=user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/",
        error:"/"
    },
    session: {
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}