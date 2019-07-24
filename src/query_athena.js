async (params) => {
  stash.put("runFinished", false);
  let executionId = api.run("aws_athena.start_query_execution", {
      QueryString : params.query,
      ClientRequestToken: makeid(35),
      WorkGroup: "primary",
      ResultConfiguration: {OutputLocation: 's3://prod.events-logs.transposit.com/query-results'}
    })[0]['QueryExecutionId'];
  

  let result;
  await new Promise( resolve => {
      setTimeout(() => {
         result = api.run("aws_athena.get_query_results", { QueryExecutionId: executionId }).map(e => {
        		return e.Data;
      		});
        resolve();
    }, 10000);
  	});

  const cols = result[0];
  result = result.slice(1, result.length);
  let formattedData = result.map(e => {
      return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
  });
  let message = JSON.stringify(formattedData);
  return api.run("slack_webhook.post_to_response_url", {
        response_url: params.response_url,
        post_body: message
      }); 
  
  
  function makeid(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */