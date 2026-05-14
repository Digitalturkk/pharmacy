import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

const registerSeller = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const normolizedPassword = typeof password === 'string' ? password : String(password);
        if (!normolizedPassword) {
            return res.status(400).json({ error: 'Password is required and must be a string' });
        }
        const existingSeller = await prisma.seller.findUnique({
            where: {
                email: email
            }
        });

        if (existingSeller) {
            return res.status(400).json({ error: 'Seller with this email already exists' });
        }
    }
}