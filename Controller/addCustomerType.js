const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const addCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_name, customer_type_color, customer_type_text_color, customer_type_priority } = req.body

    if (!customer_type_name || !customer_type_color || !customer_type_text_color || !customer_type_priority) {
        return res.status(200).json({ ResponseCode: 0, message: "All fields are required" })
    }

    Connection.query("CALL SPinsertcustomertype(?, ?, ?, ?)", [customer_type_name, customer_type_color, customer_type_text_color, customer_type_priority], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error adding new customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { addCustomerType }