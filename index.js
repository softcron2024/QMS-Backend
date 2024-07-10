const express = require("express");
const cors = require("cors");
const router = require("./Route/route.js");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config({
  path: './.env'
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Parse CORS_ORIGIN environment variable to get an array of origins
const corsOrigins = JSON.parse(process.env.CORS_ORIGIN);

const corsOptions = {
  origin: (origin, callback) => {
    if (corsOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1", router);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
