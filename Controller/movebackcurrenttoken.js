const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const moveBackCurrentToken = asyncHandler(async (req, res) => {
    Connection.query("CALL SPmovebackinprocesstoken()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error moving token back, Try Again!!!" });
        }
        return res.status(200).json({ message: results })
    });
})

module.exports = { moveBackCurrentToken }