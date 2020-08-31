import {SAVE_INPUT} from '../actionTypes'

export const actionSaveInput = (id, input) => ({
  type: SAVE_INPUT,
  payload: {
    id, input
  }
});
