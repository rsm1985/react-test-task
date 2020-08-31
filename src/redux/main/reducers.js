// import { SET_INDEX_TREE_DATA } from "../actionTypes";

const defaultState = {
  aaa: 111
};

export const mainReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "OK": {
      return {
        ...state,
        aaa: payload
      };
    }

    default:
      return state;
  }
};
