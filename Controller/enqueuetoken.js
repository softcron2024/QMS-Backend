const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const enqueuetoken = asyncHandler(async (req, res) => {
    Connection.query("CALL SPenqueuetokens()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error getting tokens, Try Again!!!" });
        }
        return res.status(200).json({ message: results })
    });
})

module.exports = { enqueuetoken }