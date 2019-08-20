(params) => {
return task.listTasks();
  let executionId = stash.get(params.stashId);
  if (executionId) {
    try {
      let result = api
        .run("aws_athena.get_query_results", { QueryExecutionId: executionId })
        .map(e => {
          return e.Data;
        });
		
      const cols = result[0];
      result = result.slice(1, result.length);
      let formattedMsg = result.map(e => {
        return cols.reduce((obj, k, i) => ({ ...obj, [k]: e[i] }), {});
      });
		
      // delete task if data came back
      let key = params.stashId + "task";
      let taskUUID = stash.get(key);
      task.delete(taskUUID);
    } catch (error) {
      return "Run has not finished/Run contains bad query";
    }
        
   return api.run("slack_webhook.post_to_response_url", {
      response_url: params.stashId,
      post_body: { text: JSON.stringify(formattedMsg) }
    });
  }

  throw new Error(`stashId ${params.stashId} does not exist!`);
}
