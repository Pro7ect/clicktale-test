import { Component, Input } from '@angular/core';

import { Item } from '../interfaces/items-list.interface';

@Component({
  selector: 'page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss'],
})
export class PageViewComponent {
  @Input() items: Item[];
}
