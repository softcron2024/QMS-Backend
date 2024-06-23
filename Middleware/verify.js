const asynchandler = require("../utils/asynchandler");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const verify = asynchandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No headers found" });
    }

    const token = authHeader.split(" ")[1]; // Get the token part after "Bearer "
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      req.user = decoded.username;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized request" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = verify;
