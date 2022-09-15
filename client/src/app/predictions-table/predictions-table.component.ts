import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PredictionsData, PredictionsColumnsDict, DownloadEvent } from './predictions.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { StructureImageDialogComponent } from '../structure-image-dialog/structure-image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAnalyticsService } from '../google-analytics/google-analytics.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'adme-predictions-table',
  templateUrl: './predictions-table.component.html',
  styleUrls: ['./predictions-table.component.scss']
})
export class PredictionsTableComponent implements OnInit {
  data: Array<any> = [];
  dataAll: Array<any> = [];
  paged: Array<any>;
  displayData: Array<any> = [];
  displayDataAll: Array<any> = [];
  page = 0;
  pageSize = 10;
  private predictions: PredictionsData;
  private prediction: PredictionsData;
  displayedColumnsDict: { [columnName: string]: PredictionsColumnsDict };
  displayedColumns: Array<string>;
  private allColumns: Array<string>;
  private allColumnsAll: Array<string>;
  @Input() dataHandling: 'replace'|'concat' = 'replace';
  errorMessage: string;
  errorMessages: Array<string> = [];
  @Output() download: EventEmitter<DownloadEvent> = new EventEmitter<DownloadEvent>();
  @Input() model: string;

  constructor(
    private dialog: MatDialog,
    private gaService: GoogleAnalyticsService
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
      this.allColumns = this.displayedColumns
      if (this.dataHandling === 'replace') {
        this.data = predictions.data;
        this.displayData = this.getNonEmptyPredictions(this.data);
      } else {
        const prediction = predictions.data[0];
        this.data.push(prediction);
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

  @Input('predictions-data-all')
  set predictionsDataAll(predictions: { [model: string]: PredictionsData }) {
    if (predictions != null) {
      for (let key in predictions) {
          let prediction = predictions[key];
          this.allColumnsAll = prediction.columns
          if(this.allColumnsAll.indexOf('Tanimoto Similarity') === -1){
              this.allColumnsAll.push('Tanimoto Similarity');
          }
          if(this.allColumnsAll.indexOf('Model') === -1){
              this.allColumnsAll.push('Model');
          }
          if (this.dataHandling === 'replace') { // fileData
            let pred_data = prediction.data;
            if (key === "CYP450"){
              for (let pred in pred_data) {
                this.dataAll.push(...this.pivotCYPData(pred_data[pred]));
              }
            }else{
              for (let pred in pred_data) {
                pred_data[pred]['Model'] = key
              }
              this.dataAll.push(...pred_data);
            }
            this.displayDataAll = this.getNonEmptyPredictions(this.dataAll);
          }else{ // sketcherData
            const pred_data = prediction.data[0];
            if (key === "CYP450"){
              this.dataAll.push(...this.pivotCYPData(pred_data));
            }
            else{
              pred_data['Model'] = key
              this.dataAll.push(pred_data);
            }
            this.displayDataAll = this.displayDataAll.concat(this.getNonEmptyPredictions(prediction.data));
          }
      }
    } else {
      this.dataAll = null;
      this.displayDataAll = null;
    }
  }

  pageChange(pageEvent?: PageEvent): void {
    this.clearErrorMessage();
    if (pageEvent != null) {
      if (pageEvent.pageIndex !== this.page) {
        this.gaService.sendEvent('click:button', 'page-change', `predictions:${this.model}`);
      }
      this.page = pageEvent.pageIndex;
      if (pageEvent.pageSize !== this.pageSize) {
        this.gaService.sendEvent('click:select', 'page-size-change', `predictions:${this.model}`);
      }
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

  pivotCYPData(pred_data) {
    let smi = pred_data['smiles']
    let sim = pred_data['Tanimoto Similarity']
    let pred_data_cyp = []
    for (const k in pred_data){
      if(k !== 'smiles' && k !== 'Tanimoto Similarity') {
        let pred_data_new = {}
        let pred_str = pred_data[k]
        pred_data_new['Predicted Class (Probability)'] = pred_str
        if (pred_str.startsWith("1") && k.endsWith("_subs")){
          pred_data_new['Prediction'] = 'substrate'
        } else if (pred_str.startsWith("1") && k.endsWith("_inhib")){
          pred_data_new['Prediction'] = 'inhibitor'
        } else if (pred_str.startsWith("0") && k.endsWith("subs")){
          pred_data_new['Prediction'] = 'non-substrate'
        }
        else{
          pred_data_new['Prediction'] = 'non-inhibitor'
        }
        pred_data_new['Tanimoto Similarity'] = sim
        pred_data_new['smiles'] = smi
        pred_data_new['Model'] = k
        pred_data_cyp.push(pred_data_new)
      }
    }
    return pred_data_cyp;
  }

  downloadCSV(): void {
    this.gaService.sendEvent('click:button', 'download', `predictions:${this.model}`);
    this.download.emit({
      data: this.data,
      allColumns: this.allColumns
    });
  }

  downloadAllCSV(): void {
    this.gaService.sendEvent('click:button', 'download', `predictions:${this.model}`);
    this.download.emit({
      data: this.dataAll,
      allColumns: this.allColumnsAll
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
