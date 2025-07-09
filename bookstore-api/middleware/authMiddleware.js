import jwt from 'jsonwebtoken';
// Top of both files
import dotenv from 'dotenv';
dotenv.config();

// Use like:
const secret = process.env.JWT_SECRET;


export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, 'yourSecretKey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};
