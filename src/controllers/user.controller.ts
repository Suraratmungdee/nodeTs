import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import fs from 'fs';
import path from 'path';
import users from '../../data/users.json';

const usersFilePath = path.join(__dirname, '../../data/users.json');

export const createUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    // อ่าน users จากไฟล์
    const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    // เช็คว่า email ซ้ำไหม
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    // สร้าง user ใหม่
    const newUser: User = {
        id: users.length + 1,
        email,
        password: bcrypt.hashSync(password, 10),
    };

    // เพิ่ม user และเขียนลงไฟล์
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ token });
};

export const profile = (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
};
