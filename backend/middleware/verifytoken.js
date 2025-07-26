const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure the decoded token has the required fields
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired. Please login again." });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token format." });
    }
    
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};