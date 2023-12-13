export const requireAdmin = (req, res, next) => {
    const user = req.user; // Assuming you attach the user object to the request during authentication

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    // If the user is authenticated and has the admin role, proceed to the next middleware
    next();
};
