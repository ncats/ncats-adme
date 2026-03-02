import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from '@shared/directives/file-select.directive';

export interface FileFormOptions {
  lineBreak: string;
  columnSeparator: string;
  hasHeaderRow: boolean;
  indexIdentifierColumn: number;
  file: File;
}

interface FileTypeDefaults {
  lineBreak: string;
  columnSeparator: string;
  hasHeaderRow: boolean;
  indexIdentifierColumn: number;
}

const FILE_TYPE_DEFAULTS: Record<string, FileTypeDefaults> = {
  csv: { lineBreak: '\n', columnSeparator: ',', hasHeaderRow: true, indexIdentifierColumn: 0 },
  text: { lineBreak: '\n', columnSeparator: '\t', hasHeaderRow: true, indexIdentifierColumn: 0 },
  smi: { lineBreak: '\n', columnSeparator: '\t', hasHeaderRow: false, indexIdentifierColumn: 0 }
};

@Component({
  selector: 'adme-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, FileSelectDirective],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Output() fileProcess = new EventEmitter<FileFormOptions>();
  @Input() hasSelectedModels = false;

  selectedFile = signal<File | null>(null);
  selectedFileName = signal<string>('');
  fileType = signal<string>('csv');
  
  options = signal({
    lineBreak: '\n',
    columnSeparator: ',',
    hasHeaderRow: true,
    indexIdentifierColumn: 0
  });
  
  get isValid(): boolean {
    return !!this.selectedFile();
  }
  
  onFileSelected(file: File | null): void {
    if (file) {
      this.selectedFile.set(file);
      this.selectedFileName.set(file.name);
      
      // Auto-detect file type from extension
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (FILE_TYPE_DEFAULTS[ext]) {
        this.fileType.set(ext);
        this.updateOptionsFromType();
      }
    } else {
      this.selectedFile.set(null);
      this.selectedFileName.set('');
    }
  }
  
  updateOptionsFromType(): void {
    const defaults = FILE_TYPE_DEFAULTS[this.fileType()];
    if (defaults) {
      this.options.set({ ...defaults });
    }
    this.saveToLocalStorage();
  }
  
  updateColumnSeparator(value: string): void {
    this.options.update(o => ({ ...o, columnSeparator: value }));
    this.saveToLocalStorage();
  }

  updateHasHeaderRow(value: boolean): void {
    this.options.update(o => ({ ...o, hasHeaderRow: value }));
    this.saveToLocalStorage();
  }

  updateIndexIdentifierColumn(value: string | number): void {
    this.options.update(o => ({ ...o, indexIdentifierColumn: +value }));
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('adme_fileType', this.fileType());
    localStorage.setItem(`adme_${this.fileType()}_options`, JSON.stringify(this.options()));
  }
  
  processFile(): void {
    const file = this.selectedFile();
    if (!file) return;
    
    const opts = this.options();
    this.fileProcess.emit({
      lineBreak: opts.lineBreak,
      columnSeparator: opts.columnSeparator,
      hasHeaderRow: opts.hasHeaderRow,
      indexIdentifierColumn: opts.indexIdentifierColumn,
      file
    });
  }
}

