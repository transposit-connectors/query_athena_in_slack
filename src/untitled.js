(params) => {
  return api.run("aws_athena.get_query_results", {QueryExecutionId: params.id}).map(e => {
        	return e.Data;
      	 });
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */