(params) => {

  let executionId = stash.get(params.stashId);
  let formattedMsg;
  if (executionId) {
    try {
      let result = api
        .run("aws_athena.get_query_results", { QueryExecutionId: executionId })
        .map(e => {
          return e.Data;
        });
		
      const cols = result[0];
      result = result.slice(1, result.length);
      formattedMsg = result.map(e => {
        return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
      });
		
      
      // delete task if data came back
      stash.put(params.stashId, null);
      let key = params.stashId + "task";
      let taskUUID = stash.get(key);
      task.delete(taskUUID);
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
}
