import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FileForm } from '../text-file/file-form.model';
import { LoadingService } from '../loading/loading.service';
import { DownloadEvent, PredictionsData } from '../predictions-table/predictions.model';
import { GoogleAnalyticsService } from '../google-analytics/google-analytics.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'adme-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  private ketcher: Ketcher;
  private sketcherDisplayedColumns = ['smiles', 'rlm'];
  sketcherData: { [modelName: string]: PredictionsData };
  fileData: { [modelName: string]: PredictionsData };

  errorMessage: string;
  errorMessages: Array<string> = [];
  file: Blob;
  link: HTMLAnchorElement;
  columnSeparator = ',';
  lineBreak = '\n';
  private sketcherIndexIdentifierColumn = 0;
  private fileIndexIdentifierColumn: number;
  indexIdentifierColumn: number;
  models = ['RLM', 'CYP450'];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private gaService: GoogleAnalyticsService
  ) {
  }

  ngOnInit(): void {
    this.link = document.createElement('a');
  }

  processSketcherInput(smiles: string): void {
    this.gaService.sendEvent('click:button', 'predict', 'sketcher');
    this.clearErrorMessage();
    this.loadingService.setLoadingState(true);
    this.indexIdentifierColumn = this.sketcherIndexIdentifierColumn;
    const options = {
      params: {
        smiles,
        model: this.models
      }
    };
    this.http.get(`${environment.apiBaseUrl}api/v1/predict`, options).subscribe((response: any) => {
      this.sketcherData = response;
      this.loadingService.setLoadingState(false);
    }, error => {
      this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
      this.loadingService.setLoadingState(false);
    });
  }

  processFile(fileForm: FileForm): void {
    this.gaService.sendEvent('click:button', 'predict', 'file');
    this.clearErrorMessage();
    this.loadingService.setLoadingState(true);
    const formData = new FormData();
    formData.append('lineBreak', fileForm.lineBreak);
    this.lineBreak = fileForm.lineBreak;
    formData.append('columnSeparator', fileForm.columnSeparator);
    this.columnSeparator = fileForm.columnSeparator;
    formData.append('hasHeaderRow', fileForm.hasHeaderRow.toString());
    formData.append('indexIdentifierColumn', fileForm.indexIdentifierColumn.toString());
    formData.append('models', this.models.join(';'));
    this.fileIndexIdentifierColumn = fileForm.indexIdentifierColumn;
    this.indexIdentifierColumn = this.fileIndexIdentifierColumn;
    formData.append('file', fileForm.file);
    this.http.post(`${environment.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response: any) => {
      if (response.hasErrors) {
        this.errorMessage = response.errorMessages;
      } else if (response && Object.keys(response).length > 0) {
        this.fileData = response;
      }
      this.loadingService.setLoadingState(false);
    }, error => {
      this.fileData = null;
      this.errorMessage = 'There was an error processing your file. Please make sure you have selected a file that contains SMILES, indicate if the file contains a header and the column number containing the SMILES.';
      this.loadingService.setLoadingState(false);
    });
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
    this.errorMessages = [];
  }

  downloadCSV(event: DownloadEvent): void {
    const dataKeys = [...event.allColumns].join(this.columnSeparator);
    const lines = [];
    event.data.forEach(data => lines.push(event.allColumns.map(key => data[key]).join(this.columnSeparator)));
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

  selectedTabChange(event: MatTabChangeEvent, category?: string): void {
    this.gaService.sendEvent('click:tab', category, event.tab.textLabel);
  }
}
