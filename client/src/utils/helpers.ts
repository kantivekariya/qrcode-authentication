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
export const setLocalState = (key: string, val: any) => {
  try {
    localStorage.setItem(key, val);
  } catch (err) {
    // Ignore write errors.
  }
};

export const loadUserFromLocal = () => {
  try {
    const expires_in = getLocalState("expires_in");
    const expires_at = getLocalState("expires_at");
    const access_token = getLocalState("access_token");
    // @ts-ignore
    if (expires_in && access_token && new Date().getTime() < expires_at) {
      // authorize
      return {
        isAuthenticated: true,
      };
    } else {
      // unauth
      return {
        isAuthenticated: false,
      };
    }
  } catch (err) {
    return {
      isAuthenticated: false,
    };
  }
};
