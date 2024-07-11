const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const updateCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_id, customer_type_name } = req.body

    Connection.query("CALL SPupdatecustomertype(?, ?)", [customer_type_id, customer_type_name], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error updating customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { updateCustomerType }