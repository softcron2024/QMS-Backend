const express = require("express");
const router = express.Router();

const { settokenactivity } = require("../Controller/settokenactivity.js");
const { thisMonthReport } = require("../Reporting/thiMonthReport.js");
const { lastWeekReport } = require("../Reporting/lastWeekReport.js");
const { thisYearReport } = require("../Reporting/thisYearReport.js");
const { enqueuetoken } = require("../Controller/enqueuetoken.js");
const { weeklyReport } = require("../Reporting/weeklyReport.js");
const { createadmin } = require("../Controller/createadmin.js");
const { createToken } = require("../Controller/createToken.js");
const { cancelToken } = require("../Controller/cancelToken.js");
const { todayReport } = require("../Reporting/todayreport.js");
const { skipToken } = require("../Controller/skipToken.js");
const { getUsers } = require("../Controller/allusers.js");
const verify = require("../Middleware/verify.js");
const { currentToken } = require("../Controller/currentToken.js")
const { getUser } = require("../Controller/getuser.js");
const { handleLogin } = require("../Controller/adminlogin.js");
const { callNextToken } = require("../Controller/callnexttoken.js");
const { missedTokens } = require("../Controller/missedTokenList.js");
const { addCustomerType } = require("../Controller/addCustomerType.js");
const { getCustomerType } = require("../Controller/getCustomerType.js");
const { recallMissedToken } = require("../Controller/recallMissedToken.js");
const { deleteCustomerType } = require("../Controller/deleteCustomerType.js");
const { adjustTokenPosition } = require("../Controller/adjustTokenPosition.js");
const { moveBackCurrentToken } = require("../Controller/movebackcurrenttoken.js");
const { updateCustomerType } = require("../Controller/updateCustomerTypeName.js");
const { waitingtoscan } = require("../Controller/waitingToScan.js");
const { getWaitingToken } = require("../Controller/getWaitingToken.js");
const { CompleteToken } = require("../Controller/completeToken.js");

// Customer routes
router.get("/getQueue", enqueuetoken)
router.get("/get-today-tokens", getUsers)
router.get("/get-customer-type", getCustomerType)
router.get("/complete-token", CompleteToken)
router.get("/waiting-to-scan", waitingtoscan)
router.get("/call-next-token", callNextToken)
router.get("/get-current-token", currentToken)
router.get("/get-waiting-token", getWaitingToken)
router.get("/get-missed-tokens-list", missedTokens)


router.post("/generate-token", createToken);
router.post("/scan-token", getUser)
router.post("/setTokenActivity", settokenactivity)
router.post("/cancel-token", cancelToken)
router.post("/recall-missed-token", recallMissedToken)
router.post("/skip-token", skipToken)
router.post("/adjust-token-position", adjustTokenPosition)
router.post("/add-customer-type", addCustomerType)
router.post("/delete-customer-type", deleteCustomerType)
router.post("/update-customer-type", updateCustomerType)

// Reporting routes

router.get("/get-today-report", todayReport)
router.get("/get-this-week-report", weeklyReport)
router.get("/get-last-week-report", lastWeekReport)
router.get("/get-this-month-report", thisMonthReport)
router.get("/get-this-year-report", thisYearReport)

// admin routes

router.post("/create-admin", createadmin)
router.post("/admin-login", handleLogin)


module.exports = router;