import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'adme-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() set length(value: number) { this._length.set(value); }
  @Input() set pageIndex(value: number) { this._pageIndex.set(value); }
  @Input() set pageSize(value: number) { this._pageSize.set(value); }
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  
  @Output() page = new EventEmitter<PageEvent>();
  
  private _length = signal(0);
  private _pageIndex = signal(0);
  private _pageSize = signal(10);
  
  currentLength = computed(() => this._length());
  currentPageIndex = computed(() => this._pageIndex());
  currentPageSize = computed(() => this._pageSize());
  
  totalPages = computed(() => 
    Math.ceil(this._length() / this._pageSize()) || 1
  );
  
  rangeLabel = computed(() => {
    const length = this._length();
    const pageIndex = this._pageIndex();
    const pageSize = this._pageSize();
    
    if (length === 0) return '0 of 0';
    
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    
    return `${startIndex + 1} - ${endIndex} of ${length}`;
  });
  
  hasPreviousPage = computed(() => this._pageIndex() > 0);
  hasNextPage = computed(() => this._pageIndex() < this.totalPages() - 1);
  
  firstPage(): void {
    if (this.hasPreviousPage()) {
      this.emitPageEvent(0);
    }
  }
  
  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.emitPageEvent(this._pageIndex() - 1);
    }
  }
  
  nextPage(): void {
    if (this.hasNextPage()) {
      this.emitPageEvent(this._pageIndex() + 1);
    }
  }
  
  lastPage(): void {
    if (this.hasNextPage()) {
      this.emitPageEvent(this.totalPages() - 1);
    }
  }
  
  onPageSizeChange(newSize: number | string): void {
    this._pageSize.set(Number(newSize));
    this.emitPageEvent(0);
  }
  
  private emitPageEvent(pageIndex: number): void {
    this._pageIndex.set(pageIndex);
    this.page.emit({
      pageIndex,
      pageSize: this._pageSize(),
      length: this._length()
    });
  }
}
