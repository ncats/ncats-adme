import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { FileForm } from '../text-file/file-form.model';

@Component({
  selector: 'adme-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  private ketcher: Ketcher;
  private defaultDisplayedColumns = ['smiles', 'rlm'];
  displayedColumns: Array<string>;
  dataSource = new MatTableDataSource<any>([]);
  data: Array<any> = [];
  paged: Array<any>;
  page = 0;
  pageSize = 25;
  isProcessing = true;

  constructor(
    private http: HttpClient
  ) {
    this.displayedColumns = this.defaultDisplayedColumns;
  }

  ngOnInit(): void {
  }

  processSketcherInput(smiles: string): void {
    this.isProcessing = true;
    this.http.get(`${environment.apiBaseUrl}api/v1/predict?smiles=${smiles}`).subscribe(response => {
      this.isProcessing = false;
      const predition = {
        // tslint:disable-next-line:object-literal-shorthand
        smiles: smiles,
        rlm: response[0]
      };
      this.data.push(predition);
      this.pageChange();
    }, error => {
      this.isProcessing = false;
    });
  }

  pageChange(pageEvent?: PageEvent): void {
    if (pageEvent != null) {
      this.page = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
    } else {
      this.page = 0;
      this.pageSize = 25;
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
    const formData = new FormData();
    formData.append('lineBreak', fileForm.lineBreak);
    formData.append('columnSeparator', fileForm.columnSeparator);
    formData.append('hasHeaderRow', fileForm.hasHeaderRow.toString());
    formData.append('indexIdentifierColumn', fileForm.indexIdentifierColumn.toString());
    formData.append('file', fileForm.file);
    this.http.post(`${environment.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response: Array<any>) => {
      if (response && response.length > 0) {
        this.data = response;
        this.pageChange();
        const keys = Object.keys(response[0]);
        this.displayedColumns = keys;
      }
    });
  }

}
