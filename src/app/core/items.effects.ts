import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError,  map, switchMap } from 'rxjs/operators';

import { ItemsState } from './interfaces/items-state.interface';
import { GetItems, GetItemsFailure, GetItemsSuccess } from './items.actions';
import { itemsUrl } from './items.constants';

@Injectable()
export class ItemsEffects {

  @Effect()
  getItems$: Observable<Action> = this.actions$.pipe(
    ofType(GetItems),
    switchMap(() => this.getItems().pipe(
      map(({ itemsList }) => GetItemsSuccess({ itemsList })),
      catchError((error: HttpErrorResponse) => of(GetItemsFailure({ error }))),
    )),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  private getItems(): Observable<ItemsState> {
    return this.http.get<ItemsState>(itemsUrl);
  }
}
