({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;
  stash.put('a','b')
console.log(parsed_body)
  setImmediate(() => {
    let user = api.user({type: "slack", workspaceId, userId});
    if (user) {
      let message = api.run('this.get_slack_message', {}, {asUser: user.id})[0];
      console.log(response_url)
      stash.put(response_url,"hello");
      api.run("slack_webhook.post_to_response_url", {
        response_url: response_url,
        post_body: message
      });      
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