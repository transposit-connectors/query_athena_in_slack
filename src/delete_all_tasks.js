(params) => {

let UUIDs = task.listTasks().map((t) => {return t.uuid});
UUIDs.forEach((u) => {
  task.delete(u)
})
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */