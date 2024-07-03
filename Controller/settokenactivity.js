const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const settokenactivity = asyncHandler(async (req, res) => {
    const { token_no } = req.body;

    if (!token_no) {
        return res.status(401).json({ message: "Token number is required" });
    }

    Connection.query("CALL SPgettoken(?)", [token_no], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err });
        }

        if (result[0].length === 0) {
            return res.status(404).json({ message: "Token not found or inactive" });
        }

        // Assuming activity_status is stored as a TINYINT(1) or similar
        const currentActivityStatus = result[0][0].activity_status.readUInt8(0); // Convert buffer to integer
        const newActivityStatus = currentActivityStatus === 1 ? 0 : 1; // Toggle activity status

        Connection.query(
            "CALL SPsettokenactivity(?,?)",
            [newActivityStatus, token_no],
            (error, response) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to update activity status" });
                }
                return res
                    .status(200)
                    .json({
                        message: "Activity status updated successfully",
                        activity_status: newActivityStatus
                    });
            }
        );
    });
});

module.exports = { settokenactivity };
