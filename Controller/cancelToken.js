const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const cancelToken = asyncHandler(async (req, res) => {

    const { token_no } = req.body

    Connection.query("CALL SPcanceltoken(?)", [token_no], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error canelling token, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { cancelToken }