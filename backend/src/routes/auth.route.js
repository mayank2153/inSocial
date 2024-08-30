import { Router } from "express";
import { verifyJWT } from "../middlewares/authjwt.middleware.js"; // Adjust the path as necessary

const authRouter = Router();

// Apply verifyJWT middleware to the /verify-token route
authRouter.get('/verify-token', verifyJWT, (req, res) => {
    
    // If the middleware passes, the user is attached to req.user
    return res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default authRouter;
