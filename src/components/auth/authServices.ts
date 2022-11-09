import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../users/usersInterfaces';
import config from '../../apiConfig';

const { saltRounds, jwtSecret } = config;

const authServices = {
  hash: async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  },
  compare: async (password: string, hash: string): Promise<Boolean> => {
    const match = await bcrypt.compare(password, hash);
    return match;
  },
  sign: async (user: IUser): Promise<string> => {
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
    return token;
  },
  verify: async (token: string) => {
    const decoded = await jwt.verify(token, jwtSecret);
    return decoded;
  },
};

export default authServices;