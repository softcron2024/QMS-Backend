const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const updateCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_id, customer_type_name, customer_type_color, customer_type_text_color } = req.body

    if (!customer_type_id || !customer_type_name || !customer_type_color || !customer_type_text_color) {
        return res.status(200).json({ ResponseCode: 0, message: "Both customer type id and name are required" })
    }

    Connection.query("CALL SPupdatecustomertype(?, ?, ?, ?)", [customer_type_id, customer_type_name, customer_type_color, customer_type_text_color], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error updating customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { updateCustomerType }