(params) => {

  let executionId = stash.get(params.stashId);
  let formattedMsg;
  const counterKey = "COUNTER-" + params.stashId;
  const timesTried = stash.get(counterKey);
 
  
  console.log("timesTried = " + timesTried);
  if (timesTried > 2) {
  	// we have tried 10 times! we are done.
    cleanup();
    return api.run("slack_webhook.post_to_response_url", {
      response_url: params.stashId,
      post_body: { text: "Sorry! Your call timed out after 50s."}
    });
  }
  
  if (executionId) {
    try {
      let result = api
        .run("aws_athena.get_query_results", { QueryExecutionId: executionId })
        .map(e => {
          return e.Data;
        });
	  
      console.log(result);
      const cols = result[0];
      result = result.slice(1, result.length);
      formattedMsg = result.map(e => {
        return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
      });
	  stash.put("COUNTER-" + params.stashId, timesTried + 1);
      
      // delete task if data came back
      cleanup();
    } catch (error) {
      console.log(error);
      return "Run has not finished/Run contains bad query";
    }
        
   return api.run("slack_webhook.post_to_response_url", {
      response_url: params.stashId,
      post_body: { text: JSON.stringify(formattedMsg, null, 2) }
    });
  }

  throw new Error(`stashId ${params.stashId} does not exist!`);
  
  
  function cleanup() {
      stash.put(params.stashId, null);
      let taskKey = "TASK-" + params.stashId;
      let counterKey = "COUNTER-" + params.stashId;
      let taskUUID = stash.get(key);
      task.delete(taskUUID);
      stash.put(taskKey, null);
      stash.put(counterKey, null);
  }
}
