const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const skipToken = asyncHandler(async (req, res) => {

    const { token_no } = req.body

    Connection.query("CALL SPskiptoken(?)", [token_no], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error skipping token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0] })
    });
})

module.exports = { skipToken }