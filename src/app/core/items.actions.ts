import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Item } from 'app/features/items-list/interfaces/items-list.interface';

export const GetItems = createAction('[Items] Get data');
export const GetItemsSuccess = createAction('[Items] Get data Success', props<{ itemsList: Item[] }>());
export const GetItemsFailure = createAction('[Items] Get data Failure', props<{ error: HttpErrorResponse }>());
