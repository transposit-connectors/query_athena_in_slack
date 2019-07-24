({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;
  console.log(parsed_body);
  let result;
  
  setImmediate(() => {
    let user = api.user({type: "slack", workspaceId, userId});
    if (user) {
      //let message = api.run('this.get_slack_message', {}, {asUser: user.id})[0];
      let executionId = api.run('this.query_athena', {query: parsed_body.text, response_url: response_url}, {asUser: user.id});
      setTimeout(() => {
         result = api.run("aws_athena.get_query_results", {QueryExecutionId: executionId}, {asUser: user.id}).map(e => {
        	return e.Data;
      	 });
        console.log(result)
      }, 10000);
    } else {
      api.run("slack_webhook.post_to_response_url", {
        response_url: response_url,
        post_body: {text: 'Please configure your user'}
      });      
    }
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */