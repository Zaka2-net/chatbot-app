import User, { IUser } from "@/models/User/User";
import dbConnect from "@/utils/mongoose/mongoose";
import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
} from "@auth0/nextjs-auth0";

process.env.AUTH0_BASE_URL =
  process.env.AUTH0_BASE_URL || process.env.VERCEL_URL;

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback: (async (_, session) => {
      try {
        await dbConnect();

        const { user } = session;
        const userData = {
          userId: user.sub,
          email: user.email,
          name: user.name,
          picture: user.picture,
        };

        let userRecord: IUser | null = await User.findOne({
          userId: userData.userId,
        });

        if (userRecord) {
          userRecord.lastLogin = new Date();
        } else {
          userRecord = new User({ ...userData, lastLogin: new Date() });
        }

        await userRecord?.save();

        return session;
      } catch (error) {
        console.error(error);
      }
    }) as AfterCallbackAppRoute,
  }),
});
