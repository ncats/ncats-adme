import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'adme-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  private ketcher: Ketcher;
  displayedColumns = ['smiles', 'rlm'];
  dataSource = new MatTableDataSource<any>([]);
  data: Array<any> = [];
  paged: Array<any>;
  page = 0;
  pageSize = 25;
  isProcessing = true;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  ketcherOnLoad(ketcher: Ketcher): void {
    this.ketcher = ketcher;
    this.isProcessing = false;
  }

  addMolecule(): void {
    this.isProcessing = true;
    const smiles = this.ketcher.getSmiles();
    this.http.get(`/api/v1/predict?smiles=${smiles}`).subscribe(response => {
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

}
