const QRCode = require('qrcode');

const generateQRCode = async (data) => {
    try {
      // Generate QR code as a data URL
      const url = await QRCode.toDataURL(data);
      console.log('QR Code generated successfully!');
      return url
    } catch (err) {
      console.error('Error generating QR Code:', err);
    }
  };
  
module.exports = { generateQRCode }