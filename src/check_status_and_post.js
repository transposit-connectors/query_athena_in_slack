(params) => {
	while(stash.get(params.response_url) != "done") {
      let executionId = stash.get(params.response_url);
      // try to ping athena 
      try {
        result = api.run("aws_athena.get_query_results", { QueryExecutionId: executionId }).map(e => {
        		return e.Data;
      		});
      } catch (e) {
        console.log(e);
      }
    }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */