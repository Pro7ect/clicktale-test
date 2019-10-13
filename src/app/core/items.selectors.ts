import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ItemsState } from './interfaces/items-state.interface';

export const selectItems = createFeatureSelector<ItemsState>('items');

export const selectItemsList = createSelector(selectItems, (state: ItemsState) =>  state && state.itemsList);
