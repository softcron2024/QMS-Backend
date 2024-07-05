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
const { todayReport } = require("../Reporting/todayreport.js");
const { weeklyReport } = require("../Reporting/weeklyReport.js");
const { lastWeekReport } = require("../Reporting/lastWeekReport.js");
const { thisMonthReport } = require("../Reporting/thiMonthReport.js");
const { thisYearReport } = require("../Reporting/thisYearReport.js");
const { cancelToken } = require("../Controller/cancelToken.js");
const { callNextToken } = require("../Controller/callnexttoken.js");
const { moveBackCurrentToken } = require("../Controller/movebackcurrenttoken.js");
const { missedTokens } = require("../Controller/missedTokenList.js");
const { recallMissedToken } = require("../Controller/recallMissedToken.js");
const { skipToken } = require("../Controller/skipToken.js");

// Customer routes

router.post("/generate-token", verify, createUser);
router.get("/get-today-tokens", verify, getUsers)
router.post("/scan-token", verify, getUser)
router.post("/setTokenActivity", verify, settokenactivity)
router.get("/getQueue", verify, enqueuetoken)
router.post("/cancel-token", verify, cancelToken)
router.get("/call-next-token", verify, callNextToken)
router.get("/move-back-current-token", verify, moveBackCurrentToken)
router.get("/get-missed-tokens-list", verify, missedTokens)
router.post("/recall-missed-token", verify, recallMissedToken)
router.post("/skip-token", verify, skipToken)

// Reporting routes

router.get("/get-today-report", verify, todayReport)
router.get("/get-this-week-report", verify, weeklyReport)
router.get("/get-last-week-report", verify, lastWeekReport)
router.get("/get-this-month-report", verify, thisMonthReport)
router.get("/get-this-year-report", verify, thisYearReport)

// admin routes

router.post("/create-admin", createadmin)
router.post("/admin-login", handleLogin)


module.exports = router;