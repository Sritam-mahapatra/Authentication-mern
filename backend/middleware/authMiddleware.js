import jwt from 'jsonwebtoken';

const SECRATE_KEY = process.env.JWT_SCRATE || "mysecratekey";

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRATE_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

export default authenticateToken;