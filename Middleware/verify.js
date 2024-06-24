const asynchandler = require("../utils/asynchandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = asynchandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    let token;

    // Check if the token is provided in the Authorization header
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Get the token part after "Bearer "
    }

    // If token is not in Authorization header, check cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(404).json({ message: "No token found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded) {
        req.user = decoded.username;
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized request" });
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = verify;
