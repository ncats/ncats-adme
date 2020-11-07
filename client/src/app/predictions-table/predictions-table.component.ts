import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PredictionsData, PredictionsColumnsDict, DownloadEvent } from './predictions.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { StructureImageDialogComponent } from '../structure-image-dialog/structure-image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'adme-predictions-table',
  templateUrl: './predictions-table.component.html',
  styleUrls: ['./predictions-table.component.scss']
})
export class PredictionsTableComponent implements OnInit {
  data: Array<any> = [];
  paged: Array<any>;
  displayData: Array<any> = [];
  page = 0;
  pageSize = 10;
  private predictions: PredictionsData;
  displayedColumnsDict: { [columnName: string]: PredictionsColumnsDict };
  displayedColumns: Array<string>;
  private allColumns: Array<string>;
  @Input() dataHandling: 'replace'|'concat' = 'replace';
  errorMessage: string;
  errorMessages: Array<string> = [];
  @Output() download: EventEmitter<DownloadEvent> = new EventEmitter<DownloadEvent>();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  @Input('predictions-data')
  set predictionsData(predictions: PredictionsData) {
    if (predictions != null) {
      this.predictions = predictions;
      this.displayedColumnsDict = predictions.mainColumnsDict;
      this.displayedColumns = Object.keys(this.displayedColumnsDict).sort((a, b) => {
        return this.displayedColumnsDict[a].order - this.displayedColumnsDict[b].order;
      });
      this.allColumns = predictions.columns;
      if (this.dataHandling === 'replace') {
        this.data = predictions.data;
        this.displayData = this.getNonEmptyPredictions(this.data);
      } else {
        const predition = predictions.data[0];
        this.data.push(predition);
        this.displayData = this.displayData.concat(this.getNonEmptyPredictions(predictions.data));
      }
      this.pageChange();
      if (predictions.hasErrors) {
        this.errorMessage = 'The system encountered the following error(s) while processing your request:';
        this.errorMessages = predictions.errorMessages;
      }
    } else {
      this.data = null;
      this.displayData = null;
    }
  }

  pageChange(pageEvent?: PageEvent): void {
    this.clearErrorMessage();
    if (pageEvent != null) {
      this.page = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
    } else {
      this.page = 0;
    }
    this.paged = [];
    const startIndex = this.page * this.pageSize;
    for (let i = startIndex; i < (startIndex + this.pageSize); i++) {
      if (this.displayData[i] != null) {
        this.paged.push(this.displayData[i]);
      } else {
        break;
      }
    }
  }

  sortData(sort: Sort) {

    if (!sort.active || sort.direction === '') {
      return;
    }

    const data = this.displayData.slice();

    this.displayData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });

    this.pageChange();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
    this.errorMessages = [];
  }

  getNonEmptyPredictions(data: Array<any>): Array<any> {
    const predictionColumns = Object.keys(this.displayedColumnsDict).filter(key => !this.displayedColumnsDict[key].isSmilesColumn);
    return data.filter(item => {
      let emptyColumns = 0;
      predictionColumns.forEach(column => {
        if (item[column] == null || item[column] === '') {
          emptyColumns++;
        }
      });
      return emptyColumns < predictionColumns.length;
    });
  }

  downloadCSV(): void {
    this.download.emit({
      data: this.data,
      allColumns: this.allColumns
    });
  }

  openStructureImageDialog(smi: string): void {
    this.dialog.open(StructureImageDialogComponent, {
      data: {
        smiles: smi
      }
    });
  }
}
