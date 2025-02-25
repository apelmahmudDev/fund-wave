import NextAuth from "next-auth";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userModel } from "./models/user-model";
import bcrypt from "bcryptjs";
// import client from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
	// adapter: MongoDBAdapter(client, { databaseName: process.env.ENVIRONMENT }),
	...authConfig,
	providers: [
		// Credentials({
		// 	credentials: {
		// 		email: {},
		// 		password: {},
		// 	},
		// 	authorize: async (credentials) => {
		// 		let user = null;
		// 		if (credentials === null) return user;
		// 		try {
		// 			user = await userModel.findOne({ email: credentials.email });
		// 			if (user) {
		// 				const isMatch = await bcrypt.compare(
		// 					credentials.password,
		// 					user.password
		// 				);
		// 				if (isMatch) {
		// 					return user;
		// 				} else {
		// 					throw new Error("Email or password is incorrect.");
		// 				}
		// 			} else {
		// 				throw new Error("No user found");
		// 			}
		// 		} catch {
		// 			throw new Error("Invalid credentials.");
		// 		}
		// 		return user;
		// 	},
		// }),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
});
