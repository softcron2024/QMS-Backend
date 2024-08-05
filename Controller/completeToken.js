const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const CompleteToken = asyncHandler(async (req, res) => {
    const { token_no } = req.body;
    console.log("Received token_no:", token_no);

    Connection.query("CALL SPcompletetoken(?)", [token_no], (error, results) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ ResponseCode: 0, message: "Error calling next token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] });
    });
});

module.exports = { CompleteToken };
