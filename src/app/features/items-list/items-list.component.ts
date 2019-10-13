import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { DeviceService } from 'app/core/device.service';
import { Item, ItemsListParams } from './interfaces/items-list.interface';
import { itemsListConfig } from './items-list.config';
import { ItemsListService } from './services/items-list.service';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;

  // @TODO: the name of the items to display is confusing as hell. You're listing pages on pages by using pages service/component.
  //  Renamed to a more generic "item"
  initialItems: Item[];
  itemList: Item[];
  itemsToDisplay: Item[];
  numberOfPages: number;
  pageSize: number;
  currentPage = 1;

  private readonly subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private itemsListService: ItemsListService,
              private deviceService: DeviceService,
              private ref: ChangeDetectorRef,
  ) {
    this.ref.detach();

    const paginationSettings = itemsListConfig[this.deviceService.isMobile() ? 'mobile' : 'desktop'] as ItemsListParams;

    this.pageSize = paginationSettings.pageSize;

    this.itemsListService.itemsList$.subscribe((itemList) => {
      this.initialItems = itemList;

      this.itemList = itemList;


      this.updatePageData();
    });

    this.itemsListService.getItems();
  }

  ngOnInit() {
    // @TODO The form is redundant here as we don't actually submit anything, but readme says it's preferable to use them so there you go
    this.filterForm = this.fb.group({
      filterValue: [''],
    });

    const valueChanges = this.valueChanges$
      .subscribe((v) => {
        this.itemList = this.initialItems.filter((item) => item.name.includes(v));

        this.updatePageData();
      });

    this.subscriptions.push(valueChanges);
  }

  onPageChange(pageNumber) {
    this.updatePageData(pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private updatePageData(pageNumber?: number) {
    this.currentPage = pageNumber || 1;

    this.numberOfPages = Math.ceil((this.itemList.length || 1) / this.pageSize);

    this.itemsToDisplay = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);

    this.ref.detectChanges();
  }

  private get valueChanges$(): Observable<string> {
    return this.filterForm.get('filterValue').valueChanges.pipe(
      distinctUntilChanged(),
    );
  }

}
