(params) => {
 const moment = require('moment.js');
  const _ = require('underscore.js');
const yesterday = moment().subtract("1", "day");
 const lookupTime = yesterday.format('YYYY-MM-DD') + " 00:00:00";
  let data = api.run('this.get_signups_sheet_values')[0].values;
  const cols = data[0];
  data = data.slice(1, data.length);
  formattedData = data.map(e => {
    	return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
  	});
  
  let text = "";
  formattedData.forEach((d) => {
    if (d.Dte === lookupTime) {
      text = text + "on " + yesterday.format('YYYY-MM-DD') + ", Number of Signup = " + d.Count + ", rolling sum (28 days) = " + d["sum of past 28 days"];
    }
  })
  return text
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */