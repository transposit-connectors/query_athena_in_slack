({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;
  console.log(parsed_body);
  let result;
  let queryText = parsed_body.text.replace(/`/g, "'");
  setTimeout(() => {
    let user = api.user({ type: "slack", workspaceId, userId });
    if (user) {
      let executionId = api.run(
        "this.query_athena",
        { query: queryText, response_url: response_url },
        { asUser: user.id }
      )[0];
      stash.put(response_url, executionId);
	  //api.run('this.check_status_and_post', {response_url: response_url}, { asUser: user.id });
    } else {
      // api.run("slack_webhook.post_to_response_url", {
      //   response_url: response_url,
      //   post_body: { text: "Please configure your user" }
      // });
    }
  }, 5000);
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
