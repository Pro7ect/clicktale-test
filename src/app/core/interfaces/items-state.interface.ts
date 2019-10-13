import { HttpErrorResponse } from '@angular/common/http';

import { Item } from 'app/features/items-list/interfaces/items-list.interface';

export interface ItemsState {
  itemsList: Item[];
  error?: HttpErrorResponse;
}
