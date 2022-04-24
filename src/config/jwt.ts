import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
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

export const generateToken = (data: any) => {
  return jwt.sign({ ...data }, JWT_SECRET, { expiresIn: '1h' });
};

export default passport;
