const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const deleteCustomerType = asyncHandler(async (req, res) => {

    const { customer_type_id } = req.body

    Connection.query("CALL SPdeletecustomertype(?)", [customer_type_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error deleting customer type, Try Again!!!" });
        }
        return res.status(200).json({ message: results[0][0] })
    });
})

module.exports = { deleteCustomerType }