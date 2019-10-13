import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ItemsState } from 'app/core/interfaces/items-state.interface';
import { selectItemsList } from 'app/core/items.selectors';
import { GetItems } from 'app/core/items.actions';
import { Item } from '../interfaces/items-list.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  itemsList$: Observable<Item[]>;

  constructor(private store: Store<ItemsState>) {

    this.itemsList$ = this.store.pipe(
      select(selectItemsList),
      filter((items: Item[]) => {
        return !!items;
      }),
    );
  }

  getItems() {
    this.store.dispatch(GetItems());
  }
}
