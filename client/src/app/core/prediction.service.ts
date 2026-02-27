import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, timeout, TimeoutError } from 'rxjs';
import { ConfigService } from './config.service';

export interface PredictionColumn {
  order: number;
  description: string;
  isSmilesColumn: boolean;
}

export interface PredictionData {
  data: Record<string, unknown>[];
  columns: string[];
  mainColumnsDict: Record<string, PredictionColumn>;
  hasErrors?: boolean;
  errorMessages?: string[];
}

export interface PredictionResponse {
  [model: string]: PredictionData;
}

export interface FileFormOptions {
  lineBreak: string;
  columnSeparator: string;
  hasHeaderRow: boolean;
  indexIdentifierColumn: number;
  file: File;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  private get apiBaseUrl(): string {
    return this.configService.apiBaseUrl;
  }

  predictFromSmiles(smiles: string, models: string[]): Observable<PredictionResponse> {
    // Encode the SMILES to handle special characters
    const encodedSmiles = smiles.replace(/\+/gi, '%2B');
    
    let params = new HttpParams().set('smiles', encodedSmiles);
    models.forEach(model => {
      params = params.append('model', model);
    });

    return this.http.get<PredictionResponse>(`${this.apiBaseUrl}api/v1/predict`, { params }).pipe(
      catchError(error => {
        console.error('Prediction error:', error);
        return of({
          error: {
            data: [],
            columns: [],
            mainColumnsDict: {},
            hasErrors: true,
            errorMessages: ['There was an error processing your structure. Please modify it and try again.']
          }
        } as PredictionResponse);
      })
    );
  }

  predictFromFile(options: FileFormOptions, models: string[]): Observable<PredictionResponse> {
    const formData = new FormData();
    formData.append('lineBreak', options.lineBreak);
    formData.append('columnSeparator', options.columnSeparator);
    formData.append('hasHeaderRow', options.hasHeaderRow.toString());
    formData.append('indexIdentifierColumn', options.indexIdentifierColumn.toString());
    formData.append('model', models.join(';'));
    formData.append('file', options.file);

    return this.http.post<PredictionResponse>(`${this.apiBaseUrl}api/v1/predict-file`, formData).pipe(
      timeout(300000), // 5 minute timeout for large file processing
      catchError(error => {
        console.error('File prediction error:', error);
        let message: string;
        if (error instanceof TimeoutError) {
          message = 'The prediction request timed out. Please try with fewer SMILES or fewer models selected.';
        } else if (error.status === 0) {
          message = 'The server took too long to respond. Please try with fewer SMILES or fewer models selected.';
        } else {
          message = 'There was an error processing your file. Please make sure you have selected a file that contains SMILES.';
        }
        return of({
          error: {
            data: [],
            columns: [],
            mainColumnsDict: {},
            hasErrors: true,
            errorMessages: [message]
          }
        } as PredictionResponse);
      })
    );
  }

  getStructureImage(smiles: string): string {
    return `${this.apiBaseUrl}api/v1/structure_image/${encodeURIComponent(smiles)}`;
  }
}

