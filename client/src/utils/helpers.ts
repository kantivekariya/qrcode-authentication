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
