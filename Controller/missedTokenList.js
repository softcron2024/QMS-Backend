const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const missedTokens = asyncHandler(async (req, res) => {
    Connection.query("CALL SPmissedtokens()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error fetching missed tokens list, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0] })
    });
})

module.exports = { missedTokens }