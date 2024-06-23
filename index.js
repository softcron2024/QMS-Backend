const express = require("express");
const cors = require("cors");
const router = require("./Route/route.js");
const dotenv = require("dotenv")
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();

dotenv.config({
  path: './.env'
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true,
  })
);
app.use(cookieParser())



app.use("/api/v1", router);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
