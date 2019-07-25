({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;
  console.log(parsed_body);
  let result;
  let queryText = parsed_body.text.replace(/`/g, "'");
  setImmediate(() => {
    let user = api.user({ type: "slack", workspaceId, userId });
    if (user) {
      let executionId = api.run(
        "this.query_athena",
        { query: queryText, response_url: response_url },
        { asUser: user.id }
      )[0];

      setTimeout(() => {
        try {
        result = api
          .run(
            "aws_athena.get_query_results",
            { QueryExecutionId: executionId },
            { asUser: user.id }
          )
          .map(e => {
            return e.Data;
          });
        } catch(e) {
         api.run("slack_webhook.post_to_response_url", {
        	response_url: response_url,
        	post_body: { text: e.toString() }
      	 });
        }
		const cols = result[0];
        result = result.slice(1, result.length);
        let formattedData = result.map(e => {
          return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
        });

        let message = api.run("this.get_slack_message", {
          text: JSON.stringify(formattedData)
        });
        api.run("slack_webhook.post_to_response_url", {
          response_url: response_url,
          post_body: message[0]
        });
      }, 10000);
    } else {
      api.run("slack_webhook.post_to_response_url", {
        response_url: response_url,
        post_body: { text: "Please configure your user" }
      });
    }
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
