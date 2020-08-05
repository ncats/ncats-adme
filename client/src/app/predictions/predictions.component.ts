import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { FileForm } from '../text-file/file-form.model';
import { LoadingService } from '../loading/loading.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { StructureImageDialogComponent } from '../structure-image-dialog/structure-image-dialog.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'adme-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  private ketcher: Ketcher;

  private sketcherDisplayedColumns = ['smiles', 'rlm'];
  private sketcherColumnsDict: { [columnName: string]: { order: number, description: string, isSmilesColumn: boolean } };
  private sketcherData: Array<any> = [];
  private sketcherDisplayData: Array<any> = [];

  private fileDisplayedColumns: Array<string>;
  private fileAllColumns: Array<string>;
  private fileColumnsDict: { [columnName: string]: { order: number, description: string, isSmilesColumn: boolean } };
  private fileData: Array<any> = [];
  private fileDisplayData: Array<any> = [];

  displayedColumns: Array<string>;
  displayedColumnsDict: { [columnName: string]: { order: number, description: string, isSmilesColumn: boolean } };
  private allColumns: Array<string>;

  displayData: Array<any> = [];
  data: Array<any> = [];
  paged: Array<any>;
  page = 0;
  pageSize = 10;
  errorMessage: string;
  errorMessages: Array<string> = [];
  file: Blob;
  link: HTMLAnchorElement;
  columnSeparator = ',';
  lineBreak = '\n';
  private sketcherIndexIdentifierColumn = 0;
  private fileIndexIdentifierColumn: number;
  indexIdentifierColumn: number;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = this.sketcherDisplayedColumns;
  }

  ngOnInit(): void {
    this.link = document.createElement('a');
  }

  processSketcherInput(smiles: string): void {
    this.clearErrorMessage();
    this.loadingService.setLoadingState(true);
    this.indexIdentifierColumn = this.sketcherIndexIdentifierColumn;
    this.http.get(`${environment.apiBaseUrl}api/v1/predict?smiles=${smiles}`).subscribe((response: any) => {
      this.sketcherColumnsDict = response.mainColumnsDict;
      this.displayedColumnsDict = this.sketcherColumnsDict;
      this.sketcherDisplayedColumns = Object.keys(this.sketcherColumnsDict).sort((a, b) => {
        return this.displayedColumnsDict[a].order - this.displayedColumnsDict[b].order;
      });
      this.displayedColumns = this.sketcherDisplayedColumns;
      this.allColumns = this.displayedColumns;
      const predition = response.data[0];
      this.sketcherData.push(predition);
      this.data = this.sketcherData;
      this.sketcherDisplayData = this.sketcherDisplayData.concat(this.getNonEmptyPredictions(response.data));
      this.displayData = this.sketcherDisplayData;
      this.pageChange();
      if (response.hasErrors) {
        this.errorMessage = 'The system encountered the following error(s) while processing your request:';
        this.errorMessages = response.errorMessages;
      }
      this.loadingService.setLoadingState(false);
    }, error => {
      this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
      this.loadingService.setLoadingState(false);
    });
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

  processFile(fileForm: FileForm): void {
    this.clearErrorMessage();
    this.loadingService.setLoadingState(true);
    const formData = new FormData();
    formData.append('lineBreak', fileForm.lineBreak);
    this.lineBreak = fileForm.lineBreak;
    formData.append('columnSeparator', fileForm.columnSeparator);
    this.columnSeparator = fileForm.columnSeparator;
    formData.append('hasHeaderRow', fileForm.hasHeaderRow.toString());
    formData.append('indexIdentifierColumn', fileForm.indexIdentifierColumn.toString());
    this.fileIndexIdentifierColumn = fileForm.indexIdentifierColumn;
    this.indexIdentifierColumn = this.fileIndexIdentifierColumn;
    formData.append('file', fileForm.file);
    this.http.post(`${environment.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response: any) => {
      if (response && response.data && response.data.length > 0) {
        this.fileColumnsDict = response.mainColumnsDict;
        this.displayedColumnsDict = this.fileColumnsDict;
        this.fileDisplayedColumns = Object.keys(this.fileColumnsDict).sort((a, b) => {
          return this.displayedColumnsDict[a].order - this.displayedColumnsDict[b].order;
        });
        this.displayedColumns = this.fileDisplayedColumns;
        this.fileAllColumns = response.columns;
        this.allColumns = this.fileAllColumns;
        this.fileData = response.data;
        this.data = this.fileData;
        this.fileDisplayData = this.getNonEmptyPredictions(this.fileData);
        this.displayData = this.fileDisplayData;
        this.pageChange();
      }
      if (response.hasErrors) {
        this.errorMessage = 'The system encountered the following error(s) while processing your request:';
        this.errorMessages = response.errorMessages;
      }
      this.loadingService.setLoadingState(false);
    }, error => {
      this.data = null;
      this.fileData = null;
      this.displayData = null;
      this.errorMessage = 'There was an error processing your file. Please make sure you have selected a file that contains SMILES, indicate if the file contains a header and the column number containing the SMILES.';
      this.loadingService.setLoadingState(false);
    });
  }

  updateSelectedTab(event: MatTabChangeEvent): void {
    this.clearErrorMessage();
    if (event.index === 1) {
      this.indexIdentifierColumn = this.fileIndexIdentifierColumn;
      this.displayedColumnsDict = this.fileColumnsDict;
      this.displayedColumns = this.fileDisplayedColumns;
      this.allColumns = this.fileAllColumns;
      this.displayData = this.fileDisplayData;
      this.data = this.fileData;
    } else {
      this.indexIdentifierColumn = this.sketcherIndexIdentifierColumn;
      this.displayedColumnsDict = this.sketcherColumnsDict;
      this.displayedColumns = this.sketcherDisplayedColumns;
      this.allColumns = this.displayedColumns;
      this.displayData = this.sketcherDisplayData;
      this.data = this.sketcherData;
    }
    this.pageChange();
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
    this.errorMessages = [];
  }

  downloadCSV(): void {
    const dataKeys = [...this.allColumns].join(this.columnSeparator);
    const lines = [];
    this.data.forEach(data => lines.push(this.allColumns.map(key => data[key]).join(this.columnSeparator)));
    const csv = dataKeys + this.lineBreak + lines.join(this.lineBreak);
    this.file = new Blob([csv], { type: 'text/csv'});
    this.link.download = 'ADMEModelsPredictions.csv';
    this.downloadFile();
  }

  downloadFile(): void {
    // let url = window.URL.createObjectURL(this.file);
    this.link.href = window.URL.createObjectURL(this.file);
    this.link.click();
    // window.open(url);
  }

  openStructureImageDialog(smi: string): void {
    this.dialog.open(StructureImageDialogComponent, {
      data: {
        smiles: smi
      }
    });
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
}
