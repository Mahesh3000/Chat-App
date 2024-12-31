const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("jlajsdlkasjdlkajslk");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey); // This will throw an error if the token is invalid

    // Attach the decoded user data (such as user id) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
