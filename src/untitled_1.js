(params) => {
 const moment = require('moment.js');
const yesterday = moment().subtract("1", "day");
 const lookupTime = yesterday.format('YYYY-MM-DD') + " 00:00:00";
  
  return api.run('this.get_sheet_values')
 
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */