(params) => {
	while(stash.get(params.response_url) != null) {
      let executionId = stash.get(params.response_url);
      let result;
      // try to ping athena 
      try {
        setTimeout(() => {
          result = api.run("aws_athena.get_query_results", { QueryExecutionId: executionId }).map(e => {
        		return e.Data;
      		});
          
        }, 5000)
        
      } catch (e) {
        console.log(e);
      }
    }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */