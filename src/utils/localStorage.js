export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("formData");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("formData", serializedState);
  } catch {
    // ignore write errors
  }
};
