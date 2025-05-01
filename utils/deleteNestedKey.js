const deleteNestedKeys = (obj, keys) => {
  keys.forEach(key => {
    const parts = key.split(".");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (current[parts[i]]) {
        current = current[parts[i]];
      } else {
        return;
      }
    }

    delete current[parts[parts.length - 1]];
  });
};

module.exports = deleteNestedKeys;
