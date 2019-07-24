({user}) => {
  return {
    // The blocks get displayed in the actual message. 
    // You can play with block kit here: https://api.slack.com/tools/block-kit-builder
    blocks: [{
      "type": "section",
      "text": {
          "type": "mrkdwn",
          "text":"Hello World"
      }
    }],
    // The text content gets displayed in the notification
    text: 'A message from Transposit!'
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */