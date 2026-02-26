import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabGroupComponent, Tab } from '@shared/components/tab-group/tab-group.component';
import { SketcherComponent } from './sketcher/sketcher.component';
import { FileUploadComponent, FileFormOptions } from './file-upload/file-upload.component';
import { ResultsTableComponent, DownloadEvent } from './results-table/results-table.component';
import { PredictionService, PredictionResponse } from '@core/prediction.service';
import { LoadingService } from '@core/loading.service';
import { AnalyticsService } from '@core/analytics.service';
import { ConfigService } from '@core/config.service';

interface PredModel {
  id: number;
  name: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'adme-predictions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabGroupComponent,
    SketcherComponent,
    FileUploadComponent,
    ResultsTableComponent
  ],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent {
  private predictionService = inject(PredictionService);
  private loadingService = inject(LoadingService);
  private analyticsService = inject(AnalyticsService);
  private configService = inject(ConfigService);
  
  inputTabs: Tab[] = [
    { label: 'Sketcher' },
    { label: 'Text File' }
  ];
  
  models: PredModel[] = [
    { id: 0, name: 'HLM Stability', value: 'HLM', checked: true },
    { id: 1, name: 'RLM Stability', value: 'RLM', checked: true },
    { id: 2, name: 'Solubility', value: 'Solubility', checked: true },
    { id: 3, name: 'PAMPA pH 7.4', value: 'PAMPA', checked: true },
    { id: 4, name: 'PAMPA pH 5', value: 'PAMPA50', checked: true },
    { id: 5, name: 'PAMPA BBB', value: 'PAMPABBB', checked: true },
    { id: 6, name: 'HLC Stability', value: 'HLC', checked: true },
    { id: 7, name: 'MLC Stability', value: 'MLC', checked: true },
    { id: 8, name: 'RLC Stability', value: 'RLC', checked: true },
    { id: 9, name: 'CYP450', value: 'CYP450', checked: false }
  ];

  modelLabels: Record<string, string> = {
    HLM: 'Human Liver Microsomal Stability',
    RLM: 'Rat Liver Microsomal Stability',
    Solubility: 'Solubility',
    PAMPA: 'PAMPA Permeability (pH 7.4)',
    PAMPA50: 'PAMPA Permeability (pH 5.0)',
    PAMPABBB: 'PAMPA BBB Permeability',
    HLC: 'Human Liver Cytosolic Stability',
    MLC: 'Mouse Liver Cytosolic Stability',
    RLC: 'Rat Liver Cytosolic Stability',
    CYP450: 'CYP450'
  };
  
  selectedInputTab = signal(0);
  selectedResultTab = signal(0);
  sketcherData = signal<PredictionResponse | null>(null);
  fileData = signal<PredictionResponse | null>(null);
  errorMessage = signal('');
  selectedModels = signal<string[]>([]);
  
  columnSeparator = ',';
  lineBreak = '\n';
  
  get apiKetcherUrl(): string {
    return `${this.configService.apiBaseUrl}ketcher`;
  }
  
  get selectedModelValues(): string[] {
    return this.models.filter(m => m.checked).map(m => m.value);
  }
  
  get resultTabs(): Tab[] {
    return this.selectedModels().map(m => ({ label: this.modelLabels[m] || m, id: m }));
  }
  
  toggleModel(model: PredModel): void {
    model.checked = !model.checked;
  }
  
  onInputTabChange(event: { index: number; tab: Tab }): void {
    this.selectedInputTab.set(event.index);
    this.analyticsService.sendEvent('click:tab', 'predictions:input-type', event.tab.label);
  }

  onResultTabChange(event: { index: number; tab: Tab }): void {
    this.selectedResultTab.set(event.index);
  }
  
  processSketcherInput(smiles: string): void {
    this.analyticsService.sendEvent('click:button', 'predict', 'sketcher');
    this.clearError();
    this.sketcherData.set(null);
    
    const models = this.selectedModelValues;
    if (models.length === 0) {
      this.errorMessage.set('Please select at least one model.');
      return;
    }
    
    this.selectedModels.set(models);
    this.selectedResultTab.set(0);
    this.loadingService.show();

    this.predictionService.predictFromSmiles(smiles, models).subscribe({
      next: (response) => {
        if (response && Object.keys(response).length > 0) {
          const firstKey = Object.keys(response)[0];
          if ((response[firstKey] as { hasErrors?: boolean }).hasErrors) {
            this.errorMessage.set((response[firstKey] as { errorMessages?: string[] }).errorMessages?.join(', ') || 'Error processing request');
          } else {
            this.sketcherData.set(response);
          }
        }
        this.loadingService.hide();
      },
      error: () => {
        this.errorMessage.set('There was an error processing your structure. Please modify it and try again.');
        this.loadingService.hide();
      }
    });
  }
  
  processFile(options: FileFormOptions): void {
    this.analyticsService.sendEvent('click:button', 'predict', 'file');
    this.clearError();
    this.fileData.set(null);
    
    const models = this.selectedModelValues;
    if (models.length === 0) {
      this.errorMessage.set('Please select at least one model.');
      return;
    }
    
    this.selectedModels.set(models);
    this.selectedResultTab.set(0);
    this.lineBreak = options.lineBreak;
    this.columnSeparator = options.columnSeparator;
    this.loadingService.show();
    
    this.predictionService.predictFromFile(options, models).subscribe({
      next: (response) => {
        if (response && Object.keys(response).length > 0) {
          const firstKey = Object.keys(response)[0];
          if ((response[firstKey] as { hasErrors?: boolean }).hasErrors) {
            this.errorMessage.set((response[firstKey] as { errorMessages?: string[] }).errorMessages?.join(', ') || 'Error processing request');
          } else {
            this.fileData.set(response);
          }
        }
        this.loadingService.hide();
      },
      error: () => {
        this.errorMessage.set('There was an error processing your file. Please make sure you have selected a file that contains SMILES.');
        this.loadingService.hide();
      }
    });
  }
  
  clearError(): void {
    this.errorMessage.set('');
  }
  
  downloadCSV(event: DownloadEvent): void {
    const dataKeys = [...event.allColumns].join(this.columnSeparator);
    const lines = event.data.map(row => 
      event.allColumns.map(key => row[key]).join(this.columnSeparator)
    );
    
    const csv = dataKeys + this.lineBreak + lines.join(this.lineBreak);
    const blob = new Blob([csv], { type: 'text/csv' });
    
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(Date.now(), 'yyyy-MM-dd-HHmmss');
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `ADME_Predictions_${formattedDate}.csv`;
    link.click();
  }
}

