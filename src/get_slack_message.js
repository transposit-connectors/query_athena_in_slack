(params) => {
  return {
    // The blocks get displayed in the actual message. 
    // You can play with block kit here: https://api.slack.com/tools/block-kit-builder
    blocks: [{
      "type": "section",
      "text": {
          "type": "mrkdwn",
          "text": params.text
      }
    }],
    // The text content gets displayed in the notification
    text: 'A message from Athena Query Bot!'
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */