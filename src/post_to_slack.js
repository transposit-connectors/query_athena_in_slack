(params) => {
  let postText = "test";
  // post to slack
  let blockToPost = [

	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Hello from Transposit Growth Bot! Here are some stats from yesterday. You could see the dashboard live here https://app.sigmacomputing.com/transposit/db/Growth-Dashboard-V2-6G9paXJwPT66FqfibFh9MT  Ask @yoko for permissions if you can't see it!"
		},
      {
		"type": "divider"
	}
	];
  
  blockToPost = blockToPost.concat(params.sections);
  const body = {
    channel: "yokotestchannel",
    text: postText,
    blocks: blockToPost,
    as_user: "false",
    username: "transposit_bot"
  };
  let result = api.run("slack.post_chat_message", {
    $body: JSON.stringify(body)
  });
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
