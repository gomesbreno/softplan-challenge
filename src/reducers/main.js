const INITIAL_STATE = {
  activitys: [],
  accountables: []
};

export default (state = INITIAL_STATE, action) => {
  if (action.type == "changeActivitysList") {
    return { ...state, activitys: action.payload };
  }
  if (action.type == "changeAccountableList") {
    return { ...state, accountables: action.payload };
  }
  return state;
};
