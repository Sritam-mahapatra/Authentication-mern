import bcrypt from 'bcryptjs'; // Use 'bcryptjs' instead of 'bcrypt'
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Fixed spelling

// ✅ Register User
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        // Save user in DB
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Login User
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in DB
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Generate JWT Token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
