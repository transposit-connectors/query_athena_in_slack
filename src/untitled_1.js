params => {
  const moment = require("moment.js");
  const _ = require("underscore.js");
  const yesterday = moment().subtract("1", "day");
  const lookupTime = yesterday.format("YYYY-MM-DD") + " 00:00:00";
  let signupData = formatData(api.run("this.get_sheet_values", {
    sheetId: env.get("signupSheetId")
  })[0].values);
  let secondAppData = formatData(api.run("this.get_sheet_values", {
    sheetId: env.get("secondAppSheetId")
  })[0].values);
  let activeAppData = formatData(api.run("this.get_sheet_values", {
    sheetId: env.get("activeAppSheetId")
  })[0].values);
  let activeUsersData = formatData(api.run("this.get_sheet_values", {
    sheetId: env.get("activeUserSheetId")
  })[0].values);

  return signupData
  
  const cols = data[0];
  signupData = data.slice(1, data.length);
  formattedData = signupData.map(e => {
    return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
  });

  let text = "";
  formattedData.forEach(d => {
    if (d.Dte === lookupTime) {
      text =
        text +
        "on " +
        yesterday.format("YYYY-MM-DD") +
        ", Number of Signup = " +
        d.Count +
        ", rolling sum (28 days) = " +
        d["sum of past 28 days"];
    }
  });
  return text;

  function formatData(data) {
    const cols = data[0];
    data = data.slice(1, data.length);
    let formatted = data.map(e => {
      return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
    });

    for (let i =0; i<formatted.length; i++) {
      if (formatted[i].Dte === lookupTime) {
        return formatted[i]
      }
    }
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
