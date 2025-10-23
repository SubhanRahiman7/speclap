export const protectRoute = (req, res, next) => {
    if (!req.auth().isAuthenticated) {
        return res.status(401).json({ error: "Access denied. Please log in to continue." }); 
    }
    next();
};