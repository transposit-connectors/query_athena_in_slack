(params) => {
  let taskId = task.create("this.check_status", {stashId: params.stashId}).runEvery(5, "SECONDS");
	
	
  //stash.put("https://hooks.slack.com/commands/T2615V5UK/698942962977/bFBw3v3S9GaUyJPiUssy9yDD", "31e220f5-2e8b-4bff-8276-26073b9a2eca")
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */