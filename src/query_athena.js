(params) => {
  let executionId = api.run("aws_athena.start_query_execution", {
    QueryString: params.query,
    ClientRequestToken: makeid(35),
    WorkGroup: "primary",
    ResultConfiguration: {
      OutputLocation: "s3://prod.events-logs.transposit.com/query-results"
    }
  })[0]["QueryExecutionId"];

  return executionId;
  
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
