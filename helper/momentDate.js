const moment = require('moment');

function convertWarranty(num) {
  return moment().add(num,'days');
};

function countDate(str) {
  return moment(str).fromNow();
};
// console.log(new Date());
// console.log(convertWarranty(21));
// console.log(countDate('2019-08-01 09:07:46'));
module.exports = {countDate, convertWarranty};