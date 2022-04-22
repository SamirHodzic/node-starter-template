import passport from 'passport';
import passportJwt from 'passport-jwt';
import { JWT_SECRET } from './secrets';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  'jwt',
  new JwtStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, { ...token });
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
