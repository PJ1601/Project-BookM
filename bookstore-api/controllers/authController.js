import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../utils/fileHelpers.js';
// Top of both files
import dotenv from 'dotenv';
dotenv.config();

// Use like:
const secret = process.env.JWT_SECRET;
const USERS_PATH = './data/users.json';

export const register = async (req, res) => {
    const { email, password } = req.body;
    const users = await readFile(USERS_PATH);

    if (users.find(u => u.email === email))
        return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), email, password: hashedPassword };

    users.push(newUser);
    await writeFile(USERS_PATH, users);

    res.status(201).json({ message: 'Registered successfully' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const users = await readFile(USERS_PATH);
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token });
};
