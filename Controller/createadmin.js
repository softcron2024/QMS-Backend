const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");
const bcrypt = require("bcrypt")

const createadmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res
            .status(404)
            .json({ ResponseCode: 0, message: "Username, Email, Password all are required" })
    }

    const saltRounds = 1; // You can adjust the cost factor
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    Connection.query(
        "CALL SPcreateadmin(?,?)",
        [username, hashedPassword],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500)
                    .json({
                        ResponseCode: 0,
                        message: err.message == "User with this username already exists" ? err.message : "Something went wrong, try again"
                    })
            }

            return res.status(200).json({
                id: result[0][0]?.insertId,
                ResponseCode: 1,
                username,
                password
            });
        })
})

module.exports = { createadmin }