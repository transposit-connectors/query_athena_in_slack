(params) => {
 // let taskUUID = task.create("this.check_status", {stashId: params.stashId}).runEvery(5, "SECONDS");
  task.delete(task.listTasks()[0].uuid);
  //stash.put(params.stashId+"task", taskUUID);
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */