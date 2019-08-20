(params) => {
  let executionId = stash.get(params.stashId);
  if (executionId) {
    try {
      let result = api
        .run("aws_athena.get_query_results", { QueryExecutionId: executionId })
        .map(e => {
          return e.Data;
        });
      api.run("slack_webhook.post_to_response_url", {
        response_url: params.stashId,
        post_body: { text: JSON.stringify(formattedMsg) }
      });
    } catch (error) {
      return "Run has not finished/Run contains bad query";
    }
  }

  throw new Error(`stashId ${params.stashId} does not exist!`);
}
/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
