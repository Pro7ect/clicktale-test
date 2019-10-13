import { ActionReducerMap } from '@ngrx/store';

import { AppState } from 'app/core/app-state.interface';
import { itemsReducer } from './items.reducer';

export const reducers: ActionReducerMap<AppState> = {
  items: itemsReducer,
};
