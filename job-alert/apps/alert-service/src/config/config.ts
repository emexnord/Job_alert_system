import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },

  app: {
    mongoDbUri: process.env.MONGODB_URI,
  },
}));
