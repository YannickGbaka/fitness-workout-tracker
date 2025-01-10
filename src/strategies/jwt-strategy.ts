import passport from 'passport';
import User from "../mongoose/schemas/user.schema.ts";

import { Strategy, ExtractJwt } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
