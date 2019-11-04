export const changeActivitysList = activitys => {
  return {
    type: "changeActivitysList",
    payload: activitys
  };
};

export const changeAccountableList = accountables => {
  return {
    type: "changeAccountableList",
    payload: accountables
  };
};
