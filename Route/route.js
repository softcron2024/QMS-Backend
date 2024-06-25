const express = require("express");
const router = express.Router();
const { createUser } = require("../Controller/user.js");
const { getUsers } = require("../Controller/allusers.js");
const { getUser } = require("../Controller/getuser.js");
const { settokenactivity } = require("../Controller/settokenactivity.js");
const { enqueuetoken } = require("../Controller/enqueuetoken.js");
const { createadmin } = require("../Controller/createadmin.js");
const { handleLogin } = require("../Controller/adminlogin.js");
const verify = require("../Middleware/verify.js");

// Customer routes

router.post("/generate-token", verify, createUser);
router.get("/get-users", verify, getUsers)
router.post("/scan-token", verify, getUser)
router.post("/setTokenActivity", verify, settokenactivity)
router.get("/getQueue", verify, enqueuetoken)

// admin routes

router.post("/create-admin", createadmin)
router.post("/admin-login", handleLogin)


module.exports = router;