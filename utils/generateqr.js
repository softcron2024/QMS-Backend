const QRCode = require('qrcode');

const generateQRCode = async (data) => {
    try {
      // Generate QR code as a data URL
      const url = await QRCode.toDataURL(data);
      return url
    } catch (err) {
      return err
    }
  };
  
module.exports = { generateQRCode }