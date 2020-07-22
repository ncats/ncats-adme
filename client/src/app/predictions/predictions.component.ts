import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { FileForm } from '../text-file/file-form.model';
import { LoadingService } from '../loading/loading.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { StructureImageDialogComponent } from '../structure-image-dialog/structure-image-dialog.component';

@Component({
  selector: 'adme-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  private ketcher: Ketcher;
  private sketcherDisplayedColumns = ['smiles', 'rlm'];
  private fileDisplayedColumns: Array<string>;
  displayedColumns: Array<string>;
  dataSource = new MatTableDataSource<any>([]);
  private fileData: Array<any> = [];
  private sketcherData: Array<any> = [];
  data: Array<any> = [];
  paged: Array<any>;
  page = 0;
  pageSize = 10;
  errorMessage: string;
  private errorMessageTimer: any;
  file: Blob;
  link: HTMLAnchorElement;
  columnSeparator = ',';
  lineBreak = '\n';
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
    this.http.get(`${environment.apiBaseUrl}api/v1/predict?smiles=${smiles}`).subscribe(response => {
      this.loadingService.setLoadingState(false);
      const predition = response[0];
      this.sketcherData.push(predition);
      this.data = this.sketcherData;
      this.pageChange();
      this.indexIdentifierColumn = 0;
      const keys = Object.keys(response[0]);
      this.fileDisplayedColumns = keys;
      this.displayedColumns = this.fileDisplayedColumns;
    }, error => {
      this.errorMessageTimer = this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
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
      this.pageSize = 10;
    }
    this.paged = [];
    const startIndex = this.page * this.pageSize;
    for (let i = startIndex; i < (startIndex + this.pageSize); i++) {
      if (this.data[i] != null) {
        this.paged.push(this.data[i]);
      } else {
        break;
      }
    }
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
    this.indexIdentifierColumn = fileForm.indexIdentifierColumn;
    formData.append('file', fileForm.file);
    this.http.post(`${environment.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response: Array<any>) => {
      this.loadingService.setLoadingState(false);
      if (response && response.length > 0) {
        this.fileData = response;
        this.data = this.fileData;
        this.pageChange();
        const keys = Object.keys(response[0]);
        this.fileDisplayedColumns = keys;
        this.displayedColumns = this.fileDisplayedColumns;
      }
    }, error => {
      this.errorMessage = 'There was an error processing your file. Please make sure you have selected a file that contains SMILES, indicate if the file contains a header and the column number containing the SMILES.';
      this.errorMessageTimer = setTimeout(() => {
        this.errorMessage = '';
      }, 12000);
      this.loadingService.setLoadingState(false);
    });
  }

  updateSelectedTab(event: MatTabChangeEvent): void {
    this.clearErrorMessage();
    if (event.index === 0) {
      this.displayedColumns = this.fileDisplayedColumns;
      this.data = this.fileData;
    } else {
      this.displayedColumns = this.sketcherDisplayedColumns;
      this.data = this.sketcherData;
    }
    this.pageChange();
  }

  clearErrorMessage(): void {
    clearTimeout(this.errorMessageTimer);
    this.errorMessage = '';
  }

  downloadCSV(): void {
    const dataKeys = [...Object.keys(this.data[0])].join(this.columnSeparator);
    const lines = [];
    this.data.forEach(data => lines.push([...(Object.values(data))].join(this.columnSeparator)));
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
}
