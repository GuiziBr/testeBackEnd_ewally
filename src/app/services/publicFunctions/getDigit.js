exports.tituloDV = async field => {
  let iterator = 2;
  const sum = field
    .map(item => {
      const x = Number(item) * iterator;
      iterator = iterator > 1 ? (iterator -= 1) : 2;
      return x > 9 ? Math.floor(x / 10) + (x % 10) : x;
    })
    .reduce((a, b) => {
      return a + b;
    });
  const dezSup = (Math.floor(sum / 10) + 1) * 10;
  return dezSup - sum;
};

exports.dealershipDVMod10 = async field => {
  let iterator = 2;
  const mod =
    field
      .map(item => {
        const x = Number(item) * iterator;
        iterator = iterator > 1 ? (iterator -= 1) : 2;
        return x > 9 ? Math.floor(x / 10) + (x % 10) : x;
      })
      .reduce((a, b) => {
        return a + b;
      }) % 10;
  return mod === 0 ? 0 : 10 - mod;
};

exports.dealershipDVMod11 = async field => {
  let iterator = 2;
  const sum = field
    .map(item => {
      const x = item * iterator;
      iterator = iterator >= 9 ? 2 : (iterator += 1);
      return x;
    })
    .reduce((a, b) => {
      return a + b;
    });
  switch (sum % 11) {
    case 0:
      return 0;
    case 1:
      return 0;
    case 10:
      return 1;
    default:
      return 11 - (sum % 11);
  }
};
// [ '0', '0', '0', '0', '0', '0', '0', '7', '1 ', '8' ]
