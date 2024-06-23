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

      console.log(result);

      console.log(result[1][0].SPtoken_no);

      const token_no = `${result[1][0].SPtoken_no}`

      const qr_b64 = await generateQRCode(token_no)

      // console.log(result[4][0].tokenInsertId);



      Connection.query("CALL SPstoreqrwithtoken(?, ?)", [qr_b64, result[4][0].tokenInsertId], (err, response) => {
        if (err) {
          return res.status(500).json({ message: "Error storing QRcode" })
        }
        console.log(response);
        return res.status(200).json({
          id: result[0][0].insertId,
          name,
          mobile,
          no_of_person,
          qr_b64,
          token_no: result[1][0].SPtoken_no,
          no_of_person: result[4][0].no_of_person
        });
      })
    }
  );
});

module.exports = { createUser };

//#endregion
