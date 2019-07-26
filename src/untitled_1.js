params => {
  const moment = require("moment-timezone-with-data.js");
  const _ = require("underscore.js");
  const yesterday = moment().subtract("1", "day");
  const lookupTime = yesterday.tz('America/Los_Angeles').format("YYYY-MM-DD") + " 00:00:00";
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
  let summary = {'Second App Creation' : secondAppData, 'Active Apps' : activeAppData, 'Active Users': activeUsersData, 'Signups': signupData};
  
  let sections = [];
  let keys = _.keys(summary)

  _.each(keys, (k) => {
    let title = k;
    let dateString = summary[k].Date;
    let sumString = summary[k].sum;
    let rollingAvgString = summary[k]['rolling_avg'];
    let daysSum = summary[k]['28_day_sum'];
    console.log(daysSum)
    
    let section	= {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": `*${title}*\n *Date*: ${dateString} \n *Sum*: ${sumString}`
		}
	};
    
    if (daysSum != null) {
      section.text.text = section.text.text + `\n *28-day Sum*: ${daysSum}` ;
    }
    
    if (rollingAvgString != null) {
      section.text.text = section.text.text + `\n *28-day Rolling Average*: ${rollingAvgString} ` 
    }
    sections.push(section);
    sections.push(	{
		"type": "divider"
	});
  })
  
  
  return api.run('this.post_to_slack', {sections: sections});


  function formatData(data) {
    const cols = data[0];
    data = data.slice(1, data.length);
    let formatted = data.map(e => {
      return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
    });

    for (let i =0; i<formatted.length; i++) {
      if (formatted[i].Date === lookupTime) {
        return formatted[i]
      }
    }
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
