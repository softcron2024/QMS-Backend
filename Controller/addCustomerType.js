const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const addCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_name } = req.body

    if (!customer_type_name) {
        return res.status(404).json({ ResponseCode: 0, message: "Customer type name is required" })
    }

    Connection.query("CALL SPinsertcustomertype(?)", [customer_type_name], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error adding new customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { addCustomerType }