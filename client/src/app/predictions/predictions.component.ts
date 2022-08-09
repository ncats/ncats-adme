import { Component, OnInit } from '@angular/core';
import { Ketcher } from '../sketcher/ketcher.model';
import { HttpClient } from '@angular/common/http';
import { FileForm } from '../text-file/file-form.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../loading/loading.service';
import { DownloadEvent, PredictionsData } from '../predictions-table/predictions.model';
import { GoogleAnalyticsService } from '../google-analytics/google-analytics.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfigService } from '../config/config.service';
import {SelectionModel} from '@angular/cdk/collections';

export interface PredModel {
  id: number;
  name: string;
  val: string;
  checked: boolean;
}

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
  apiBaseUrl: string;
  apiKetcherUrl: string;
  errorMessage: string;
  errorMessages: Array<string> = [];
  file: Blob;
  link: HTMLAnchorElement;
  columnSeparator = ',';
  lineBreak = '\n';
  private sketcherIndexIdentifierColumn = 0;
  private fileIndexIdentifierColumn: number;
  indexIdentifierColumn: number;
  models = ['RLM', 'PAMPA50', 'PAMPA', 'Solubility', 'HLC', 'CYP450'];
  models_checked = [];
  tabLabels = {
    RLM: 'Rat Liver Microsomal Stability',
    PAMPA50: 'PAMPA Permeability (pH 5.0)',
    PAMPA: 'PAMPA Permeability (pH 7.4)',
    Solubility: 'Solubility',
    HLC: 'Human Liver Cytosolic Stability',
    CYP450: 'CYP450'
  };

  form1: FormGroup;
  // form2: FormGroup;
  modelList: PredModel[] = [
    { id: 0, name: 'RLM Stability', val: 'RLM', checked: true },
    { id: 1, name: 'PAMPA pH 5', val: 'PAMPA50', checked: true },
    { id: 2, name: 'PAMPA pH 7.4', val: 'PAMPA', checked: true },
    { id: 3, name: 'Solubility', val: 'Solubility', checked: true },
    { id: 4, name: 'HLC Stability', val: 'HLC', checked: true },
    { id: 5, name: 'CYP450', val: 'CYP450', checked: false }
  ];

  selection = new SelectionModel<string>(true, ['RLM', 'PAMPA50', 'PAMPA', 'Solubility', 'HLC']);

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private gaService: GoogleAnalyticsService,
    private configService: ConfigService,
    private fb: FormBuilder
  )

  {
    this.apiBaseUrl = configService.configData.apiBaseUrl;
    this.apiKetcherUrl = `${this.apiBaseUrl}ketcher`;
  }

  // onChange(name: string, isChecked: boolean) {
  //   const models = (this.form1.controls.name as FormArray);
  //   if (isChecked) {
  //     models.push(new FormControl(name));
  //   } else {
  //     const index = models.controls.findIndex(x => x.value === name);
  //     models.removeAt(index);
  //   }
  // }

  ngOnInit(): void {
    this.link = document.createElement('a');
    this.form1 = this.fb.group({
      name: this.fb.array([])
    });
    /*
    this.form2 = this.fb.group({
      gcnnOption: ['', Validators.required]
    });
    */
  }

  processSketcherInput(smiles: string): void {
    this.gaService.sendEvent('click:button', 'predict', 'sketcher');
    this.clearErrorMessage();
    this.clearSketcherData();
    this.loadingService.setLoadingState(true);
    this.indexIdentifierColumn = this.sketcherIndexIdentifierColumn;
    this.models_checked = this.selection.selected;
    smiles = smiles.toString().replace(/\+/gi, '%2B')
    const options = {
      params: {
        smiles,
        model: this.models_checked
        //gcnnOpt: this.form2.value.gcnnOption
      }
    };
    this.http.get(`${this.apiBaseUrl}api/v1/predict`, options).subscribe((response: any) => {
      if (response.hasErrors) {
        this.errorMessage = response.errorMessages;
      } else {
        this.sketcherData = response;
      }
      this.loadingService.setLoadingState(false);
    }, error => {
      this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
      this.loadingService.setLoadingState(false);
    });
  }

  processFile(fileForm: FileForm): void {
    this.gaService.sendEvent('click:button', 'predict', 'file');
    this.clearErrorMessage();
    this.clearFileData();
    this.loadingService.setLoadingState(true);
    this.models_checked = this.selection.selected;
    const formData = new FormData();
    formData.append('lineBreak', fileForm.lineBreak);
    this.lineBreak = fileForm.lineBreak;
    formData.append('columnSeparator', fileForm.columnSeparator);
    this.columnSeparator = fileForm.columnSeparator;
    formData.append('hasHeaderRow', fileForm.hasHeaderRow.toString());
    formData.append('indexIdentifierColumn', fileForm.indexIdentifierColumn.toString());
    formData.append('model', this.models_checked.join(';'));
    //formData.append('gcnnOpt', this.form2.value.gcnnOption);
    this.fileIndexIdentifierColumn = fileForm.indexIdentifierColumn;
    this.indexIdentifierColumn = this.fileIndexIdentifierColumn;
    formData.append('file', fileForm.file);
    this.http.post(`${this.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response: any) => {
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

  clearSketcherData(): void {
    this.sketcherData = null;
  }

  clearFileData(): void {
    this.fileData = null;
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
