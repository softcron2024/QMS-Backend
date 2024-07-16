const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const addCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_name, customer_type_color, customer_type_text_color } = req.body

    if (!customer_type_name || !customer_type_color || !customer_type_text_color) {
        return res.status(200).json({ ResponseCode: 0, message: "Customer type name is required" })
    }

    Connection.query("CALL SPinsertcustomertype(?, ?, ?)", [customer_type_name, customer_type_color, customer_type_text_color], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error adding new customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { addCustomerType }