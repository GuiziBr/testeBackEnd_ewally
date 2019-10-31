const axios = require('axios');

exports.getBank = async code => {
  const bankCode = code.slice(0, 3);
  try {
    await axios.get(
      `https://www.pagueveloz.com.br/api/v1/Bancos?codigo=${bankCode}`
    );
    return true;
  } catch (error) {
    return false;
  }
};
