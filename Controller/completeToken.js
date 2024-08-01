const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const CompleteToken = asyncHandler(async (req, res) => {
    Connection.query("CALL SPcompletetoken()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error calling next token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { CompleteToken }