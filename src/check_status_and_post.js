async (params) => {
  console.log(stash.get(params.response_url));
  while (stash.get(params.response_url) != null) {
    let executionId = stash.get(params.response_url);
    console.log(executionId);
    let result;
    // try to ping athena
    try {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 5000)
      });

      result = api
        .run("aws_athena.get_query_results", { QueryExecutionId: executionId })
        .map(e => {
          return e.Data;
        });
      const cols = result[0];
      result = result.slice(1, result.length);
      let formattedMsg = result.map(e => {
        return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
      });
      stash.put(params.response_url, null);
		
      return api.run("slack_webhook.post_to_response_url", {
        response_url: params.response_url,
        post_body: { text: JSON.stringify(formattedMsg) }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
