import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
