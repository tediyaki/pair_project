const moment = require('moment');

// function convertWarranty(str) {
//   return moment(str).add(21,'days');
// };

function countDate(str, days) {
  return moment(moment(str).add(days,'days')).fromNow();
};

// console.log(countDate('2019-07-22 07:00:00'));
module.exports = countDate;