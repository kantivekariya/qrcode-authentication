/* get local storage data */
export const getLocalState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

/* set local storage data */

export const setLocalState = (key:string, val:any) => {
  try {
    localStorage.setItem(key, val);
  } catch (err) {
    // Ignore write errors.
  }
};
