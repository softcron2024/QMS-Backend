const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const deleteCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_id } = req.body

    if (!customer_type_id) {
        return res.status(200).json({ ResponseCode: 0, message: "Customer Type id is required" })
    }

    Connection.query("CALL SPdeletecustomertype(?)", [customer_type_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ResponseCode: 0, message: "Error deleting customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { deleteCustomerType }