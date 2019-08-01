const moment = require('moment');

function displayDate(date, str) {
  return moment(date).locale('id').format(str);
}

module.exports = displayDate;