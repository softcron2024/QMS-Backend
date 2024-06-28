const Connection = require('../Connection');
const asyncHandler = require('../utils/asynchandler');

const todayReport = asyncHandler(async (req, res) => {
    Connection.query("CALL SPtodayreport()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error getting tokens, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { todayReport }