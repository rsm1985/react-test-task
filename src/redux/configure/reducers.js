import { SAVE_INPUT } from "../actionTypes";
const defaultState = {
}
export const configureReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_INPUT: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
