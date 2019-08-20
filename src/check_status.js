(params) => {
 
  let executionId = stash.get(params.stashId);
  if (executionId) {
    return api.run("aws_athena.get_query_results", { QueryExecutionId: executionId });
  }
  
  throw new Error(`stashId ${params.stashId} does not exist!`)
}
/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */