const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const recallMissedToken = asyncHandler(async (req, res) => {

    const { token_no, in_at } = req.body

    if (!(token_no || in_at)) {
        return res.status(404).json({message:"Token number and queue position are required"})
    }

    Connection.query("CALL SPrecallmissedtoken(?, ?)", [token_no, in_at], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error recalling missed token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0] })
    });
})

module.exports = { recallMissedToken }