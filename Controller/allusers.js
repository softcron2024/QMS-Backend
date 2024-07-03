const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

// Method to fetch all tokens

//#region Fetching all tokens here

const getUsers = asyncHandler(async (req, res) => {
    Connection.query("CALL SPgetallusers()", (err, response) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching tokens!" })
        }

        return res
            .status(200)
            .json(response[0])
    })
})

module.exports = { getUsers }

//#endregion