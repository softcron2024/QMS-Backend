const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const moveBackCurrentToken = asyncHandler(async (req, res) => {

    const { token_no } = req.body

    console.log(token_no);

    Connection.query("CALL SPmovebackinprocesstoken(?)", [token_no], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error moving token back, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { moveBackCurrentToken }