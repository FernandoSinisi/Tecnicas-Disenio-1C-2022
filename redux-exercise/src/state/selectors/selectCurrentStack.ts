import { RootState } from '..';

export const selectCurrentStack = (state: RootState): number[] => {
  return state.content.stack.values;
};
