import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent, PageEvent } from '@shared/components/paginator/paginator.component';
import { ModalDialogComponent } from '@shared/components/modal-dialog/modal-dialog.component';
import { ConfigService } from '@core/config.service';
import { PredictionData, PredictionColumn } from '@core/prediction.service';

export interface DownloadEvent {
  data: Record<string, unknown>[];
  allColumns: string[];
}

@Component({
  selector: 'adme-results-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, ModalDialogComponent],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss'
})
export class ResultsTableComponent {
  @Input() dataHandling: 'replace' | 'concat' = 'replace';
  @Input() model = '';
  @Input() set predictionsData(data: PredictionData | null) {
    if (data) {
      this.processData(data);
    } else {
      this.clearData();
    }
  }
  @Input() set predictionsDataAll(data: Record<string, PredictionData> | null) {
    if (data) {
      this.processAllData(data);
    }
  }
  
  @Output() download = new EventEmitter<DownloadEvent>();
  
  private configService = inject(ConfigService);
  
  displayedColumns = signal<string[]>([]);
  columnsDict = signal<Record<string, PredictionColumn>>({});
  data = signal<Record<string, unknown>[]>([]);
  dataAll = signal<Record<string, unknown>[]>([]);
  allColumns = signal<string[]>([]);
  allColumnsAll = signal<string[]>([]);
  
  pageIndex = signal(0);
  pageSize = signal(10);
  
  errorMessage = signal('');
  errorMessages = signal<string[]>([]);
  
  // Modal state
  modalOpen = signal(false);
  selectedSmiles = signal('');
  
  pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredData().slice(start, start + this.pageSize());
  });
  
  filteredData = computed(() => {
    return this.getNonEmptyPredictions(this.data());
  });
  
  private processData(predictions: PredictionData): void {
    this.columnsDict.set(predictions.mainColumnsDict);
    
    const cols = Object.keys(predictions.mainColumnsDict).sort((a, b) => 
      predictions.mainColumnsDict[a].order - predictions.mainColumnsDict[b].order
    );
    this.displayedColumns.set(cols);
    this.allColumns.set(cols);
    
    if (this.dataHandling === 'replace') {
      this.data.set([...predictions.data]);
    } else {
      this.data.update(d => [...d, ...predictions.data]);
    }
    
    this.pageIndex.set(0);
    
    if (predictions.hasErrors) {
      this.errorMessage.set('The system encountered the following error(s):');
      this.errorMessages.set(predictions.errorMessages || []);
    }
  }
  
  private processAllData(predictions: Record<string, PredictionData>): void {
    const allData: Record<string, unknown>[] = [];
    let allCols: string[] = [];
    
    for (const key in predictions) {
      const prediction = predictions[key];
      allCols = [...prediction.columns];
      
      if (!allCols.includes('Tanimoto Similarity')) allCols.push('Tanimoto Similarity');
      if (!allCols.includes('Model')) allCols.push('Model');
      
      if (this.dataHandling === 'replace') {
        const predData = prediction.data;
        if (key === 'CYP450') {
          for (const pred of predData) {
            allData.push(...this.pivotCYPData(pred));
          }
        } else {
          for (const pred of predData) {
            allData.push({ ...pred, Model: key });
          }
        }
      } else {
        const predData = prediction.data[0];
        if (key === 'CYP450') {
          allData.push(...this.pivotCYPData(predData));
        } else {
          allData.push({ ...predData, Model: key });
        }
      }
    }
    
    this.dataAll.set(allData);
    this.allColumnsAll.set(allCols);
  }
  
  private pivotCYPData(predData: Record<string, unknown>): Record<string, unknown>[] {
    const smi = predData['smiles'];
    const sim = predData['Tanimoto Similarity'];
    const result: Record<string, unknown>[] = [];
    
    for (const k in predData) {
      if (k !== 'smiles' && k !== 'Tanimoto Similarity') {
        const predStr = String(predData[k]);
        const newRow: Record<string, unknown> = {
          'Predicted Class (Probability)': predStr,
          'Tanimoto Similarity': sim,
          'smiles': smi,
          'Model': k
        };
        
        const isSubstrate = k.includes('Substrate');
        const isInhibition = k.includes('Inhibition');

        if (predStr.startsWith('1') && isSubstrate) {
          newRow['Prediction'] = 'substrate';
        } else if (predStr.startsWith('1') && isInhibition) {
          newRow['Prediction'] = 'inhibitor';
        } else if (predStr.startsWith('0') && isSubstrate) {
          newRow['Prediction'] = 'non-substrate';
        } else {
          newRow['Prediction'] = 'non-inhibitor';
        }
        
        result.push(newRow);
      }
    }
    return result;
  }
  
  private getNonEmptyPredictions(data: Record<string, unknown>[]): Record<string, unknown>[] {
    const dict = this.columnsDict();
    const predCols = Object.keys(dict).filter(k => !dict[k].isSmilesColumn);
    
    return data.filter(item => {
      let emptyCount = 0;
      predCols.forEach(col => {
        if (item[col] == null || item[col] === '') emptyCount++;
      });
      return emptyCount < predCols.length;
    });
  }
  
  private clearData(): void {
    this.data.set([]);
    this.dataAll.set([]);
    this.errorMessage.set('');
    this.errorMessages.set([]);
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
  
  clearError(): void {
    this.errorMessage.set('');
    this.errorMessages.set([]);
  }
  
  downloadCSV(): void {
    this.download.emit({
      data: this.data(),
      allColumns: this.allColumns()
    });
  }
  
  downloadAllCSV(): void {
    this.download.emit({
      data: this.dataAll(),
      allColumns: this.allColumnsAll()
    });
  }
  
  openImageModal(smiles: string): void {
    this.selectedSmiles.set(smiles);
    this.modalOpen.set(true);
  }
  
  closeModal(): void {
    this.modalOpen.set(false);
    this.selectedSmiles.set('');
  }
  
  getStructureImageUrl(smiles: string): string {
    return `${this.configService.apiBaseUrl}api/v1/structure_image/${encodeURIComponent(smiles)}`;
  }
  
  formatCellValue(value: unknown): string {
    if (value == null) return '';
    if (value === '0 (0.0)') return '0 (0.01)';
    return String(value);
  }
  
  isSmilesColumn(col: string): boolean {
    return this.columnsDict()[col]?.isSmilesColumn || false;
  }
  
  getColumnDescription(col: string): string {
    return this.columnsDict()[col]?.description || col;
  }
}

