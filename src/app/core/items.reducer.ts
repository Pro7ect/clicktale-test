import { Action, createReducer, on } from '@ngrx/store';

import { ItemsState } from './interfaces/items-state.interface';
import { GetItemsFailure, GetItemsSuccess } from './items.actions';

export const initialState: ItemsState = {
  itemsList: undefined,
  error: undefined,
};

const _itemsReducer = createReducer<ItemsState>(
  initialState,
  on(GetItemsSuccess, (state, {itemsList}) => ({...state, itemsList})),
  on(GetItemsFailure, (state, {error}) => ({...state, error})),
);

export function itemsReducer(state: ItemsState | undefined, action: Action) {
  return _itemsReducer(state, action);
}
