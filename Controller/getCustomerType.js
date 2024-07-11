const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const getCustomerType = asyncHandler(async (req, res) => {

    Connection.query("CALL SPgetcustomertype()", (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error fetching customer types, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0] })
    });
})

module.exports = { getCustomerType }