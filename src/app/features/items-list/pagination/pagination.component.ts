import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() numberOfPages: number;
  @Input() currentPage: number;

  @Output() pageChange = new EventEmitter<number>();


  onPrevious(e) {
    e.preventDefault();

    if (this.currentPage > 1) {
      this.currentPage--;
    }

    this.pageChange.emit(this.currentPage);
  }

  onNext(e) {
    e.preventDefault();

    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }

    this.pageChange.emit(this.currentPage);
  }

}
