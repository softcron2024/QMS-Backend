const express = require("express");
const router = express.Router();

const { settokenactivity } = require("../Controller/settokenactivity.js");
const { thisMonthReport } = require("../Reporting/thiMonthReport.js");
const { lastWeekReport } = require("../Reporting/lastWeekReport.js");
const { thisYearReport } = require("../Reporting/thisYearReport.js");
const { enqueuetoken } = require("../Controller/enqueuetoken.js");
const { weeklyReport } = require("../Reporting/weeklyReport.js");
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
router.get("/getQueue", verify, enqueuetoken)
router.get("/get-today-tokens", verify, getUsers)
router.get("/get-customer-type", verify, getCustomerType)
router.post("/complete-token", verify, CompleteToken)
router.get("/waiting-to-scan", verify, waitingtoscan)
router.get("/call-next-token", verify, callNextToken)
router.get("/get-current-token", verify, currentToken)
router.get("/get-waiting-token", verify, getWaitingToken)
router.get("/get-missed-tokens-list", verify, missedTokens)


router.post("/generate-token", verify, createToken);
router.post("/scan-token", verify, getUser)
router.post("/setTokenActivity", verify, settokenactivity)
router.post("/cancel-token", verify, cancelToken)
router.post("/recall-missed-token", verify, recallMissedToken)
router.post("/skip-token", verify, skipToken)
router.post("/complete-token",  CompleteToken)
router.post("/adjust-token-position", verify, adjustTokenPosition)
router.post("/add-customer-type", verify, addCustomerType)
router.post("/delete-customer-type", verify, deleteCustomerType)
router.post("/update-customer-type", verify, updateCustomerType)

// Reporting routes

router.get("/get-today-report", verify, todayReport)
router.get("/get-this-week-report", verify, weeklyReport)
router.get("/get-last-week-report", verify, lastWeekReport)
router.get("/get-this-month-report", verify, thisMonthReport)
router.get("/get-this-year-report", verify, thisYearReport)

// admin routes

router.post("/admin-login", handleLogin)


module.exports = router;