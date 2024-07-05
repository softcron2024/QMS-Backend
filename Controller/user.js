const Connection = require('../Connection');
const asyncHandler = require('../utils/asynchandler');
const { generateQRCode } = require('../utils/generateqr');
const { sendsms } = require('../utils/sendsms');

require("dotenv").config()

//#region Query to generate token

const createUser = asyncHandler(async function (req, res) {
  const { name, mobile, no_of_person } = req.body;

  if (!mobile) {
    return res.status(404).json({ message: "Mobile is required" });
  }

  Connection.query(
    "CALL SPcreatetoken(?, ?, ?)",
    [name, mobile, no_of_person],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error generating token, Try Again!" });
      }

      // Sending SMS notification
      // await sendsms(name, mobile);

      const token_no = `${result[1][0].SPtoken_no}`

      const qr_b64 = await generateQRCode(token_no)

      Connection.query("CALL SPstoreqrwithtoken(?, ?)", [qr_b64, result[4][0].tokenInsertId], (err, response) => {
        if (err) {
          return res.status(500).json({ message: "Error storing QRcode" })
        }
        return res.status(200).json({
          id: result[0][0].count_value,
          name,
          mobile,
          qr_b64,
          token_no: result[1][0].SPtoken_no,
          no_of_person: result[4][0].no_of_person,
          created_datetime:result[4][0].created_datetime
        });
      })
    }
  );
});

module.exports = { createUser };

//#endregion
