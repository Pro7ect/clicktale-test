import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { initialState, itemsReducer } from 'app/core/items.reducer';
import { ItemsEffects } from 'app/core/items.effects';
import { ItemsListComponent } from './items-list.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('items', itemsReducer, { initialState }),
    EffectsModule.forFeature([ItemsEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  declarations: [
    ItemsListComponent,
    PageViewComponent,
    PaginationComponent,
  ],
  exports: [
    ItemsListComponent,
  ],
})
export class ItemsListModule { }
