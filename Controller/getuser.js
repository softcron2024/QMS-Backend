const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

//#region Method to get user by token_no

const getUser = asyncHandler(async (req, res) => {
    const { token_no } = req.body

    // check if token_no is provided
    if (!token_no) {
        return res.status(200).json({ ResponseCode: 0, message: "Token no is required, try again" })
    }

    Connection.query("CALL SPscantoken(?)", [token_no], (err, response) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ ResponseCode: 0, message: "Token not found or Expired, Try again!" })
        }
        if (response[0][0].ResponseCode === 0) {
            console.log(err);
            return res.status(201).json({ ResponseCode: 0, message: response[0][0].ResponseMessage })
        }

        return res
            .status(200)
            .json({ ResponseCode: 1, message: "Your token is valid" })
    })
})

module.exports = { getUser }

//#endregion