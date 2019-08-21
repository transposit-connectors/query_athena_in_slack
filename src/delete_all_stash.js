(params) => {
  let keys = stash.listKeys();
  keys.forEach((k) => {
    stash.put(k,null);
  });
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */