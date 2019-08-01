// 2019-08-10T00:00:00.000Z
// 2019-07-12
// console.log(new Date('2019-07-12'));
const moment = require('moment');
let range = moment().add(21,'days');
// console.log(convertDate(a));
let warant = moment('2019-08-20T12:46:10.236');
console.log(warant.fromNow());