const moment = require('moment');
// let str = '2019-07-31T10:42:05.265Z';

function convertDate(str) {
  return moment(str).fromNow();
}
// 2019-07-12
// console.log(new Date('2019-07-12'));
// let a = moment().add(10,'days');

// console.log(convertDate(a));

module.exports = convertDate;