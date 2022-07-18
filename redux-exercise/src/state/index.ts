import { createStore } from 'redux';

import { rootReducer } from './reducer';
export type { AppAction } from './AppAction';

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
