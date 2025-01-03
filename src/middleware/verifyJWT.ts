import { Request, Response, NextFunction } from 'express'; // Import required types
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import jwt and types

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization']; // Use a string indexer for headers
    const token = authHeader && authHeader.split(' ')[1]; // Check if authHeader exists

    if (!token) {
        res.status(401).json({ message: 'Access Denied' });
        return; // Ensure early return for proper control flow
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload; // Decode the token
        (req as any).user = decoded; // Temporarily cast req to any to attach `user`
        next(); // Call the next middleware
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};
