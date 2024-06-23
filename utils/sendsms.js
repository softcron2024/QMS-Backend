const twilio = require('twilio');
require('dotenv').config();

// Twilio credentials from your Twilio account
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendsms = async (name, mobile) => {
    try {
        await client.messages.create({
            body: `Hello ${name}, your appointment is confirmed.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91` + mobile
        });

    } catch (smsError) {
        console.log(smsError);
        res.status(500).json("Error sending sms")
    }
}

module.exports = { sendsms }