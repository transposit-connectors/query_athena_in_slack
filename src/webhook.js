({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;
  console.log(parsed_body);
  let result;
  let queryText = parsed_body.text.replace(/‘/g, "'");
  queryText = queryText.replace(/’/g, "'");
  console.log(queryText)
  
  setImmediate(() => {
    let executionId = api.run(
    "this.query_athena",
    { query: queryText, response_url: response_url }
    )[0];
    stash.put(response_url, executionId);
    api.run('this.process_athena_query', {stashId: response_url});
  });
  return { status_code: 200, body: 'Working hard to run your query...`' +queryText+'`'};
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
