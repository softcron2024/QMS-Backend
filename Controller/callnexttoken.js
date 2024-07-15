const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const callNextToken = asyncHandler(async (req, res) => {
    Connection.query("CALL SPcallnexttoken()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error calling next token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { callNextToken }