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
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
