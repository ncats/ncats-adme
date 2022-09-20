import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { fileTypeDefaults } from './file-type-defaults.constant';
import { Subscription } from 'rxjs';
import { FileForm } from './file-form.model';

@Component({
  selector: 'adme-text-file',
  templateUrl: './text-file.component.html',
  styleUrls: ['./text-file.component.scss']
})
export class TextFileComponent implements OnInit, OnDestroy {
  selectedFile: File;
  selectedFileName: string;
  selectedFileContent: string | ArrayBuffer;
  fileType = 'csv';
  options = {
    lineBreak: '\n',
    columnSeparator: '\t',
    hasHeaderRow: true,
    indexIdentifierColumn: 0
  };
  @Output() fileUploadStarted = new EventEmitter<number>();
  @Output() fileDataAdded = new EventEmitter<Array<string>>();
  @Output() fileUploadFinished = new EventEmitter<void>();
  @Output() fileProcess = new EventEmitter<FileForm>();
  private subscriptions: Array<Subscription> = [];
  private acceptedFileTypes: Array<string>;
  constructor(
  ) { }

  ngOnInit() {
    const fileType = localStorage.getItem('fileType');
    if (fileType) {
      this.fileType = fileType;
    }

    const options = localStorage.getItem(`${this.fileType}_options`);
    if (options) {
      this.options = JSON.parse(options);
    } else {
      this.options = fileTypeDefaults[this.fileType];
    }
    this.acceptedFileTypes = Object.keys(fileTypeDefaults);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  @Input()

  fileSelected(file: File): void {
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      const fileNameParts = this.selectedFileName.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      if (this.acceptedFileTypes.indexOf(fileExtension) > -1) {
        this.fileType = fileExtension;
        this.updateType();
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.selectedFileContent = fileReader.result;
      };
      fileReader.readAsText(file);
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
      this.selectedFileContent = null;
    }
  }

  updateType() {
    localStorage.setItem('fileType', this.fileType);
    const options = localStorage.getItem(`${this.fileType}_options`);
    if (options) {
      this.options = JSON.parse(options);
    } else {
      this.options = fileTypeDefaults[this.fileType];
    }
  }

  updateOptions(): void {
    const options = JSON.stringify(this.options);
    localStorage.setItem(`${this.fileType}_options`, options);
  }

  processFile() {
    const fileForm: FileForm = {
      lineBreak: this.options.lineBreak,
      columnSeparator: this.options.columnSeparator,
      hasHeaderRow: this.options.hasHeaderRow,
      indexIdentifierColumn: this.options.indexIdentifierColumn,
      file: this.selectedFile
    };
    this.fileProcess.emit(fileForm);
    // const rows = this.selectedFileContent.toString().split(/\r\n|\r|\n/g);
    // if (rows.length === 1) {
    //   alert('Either your file does not have any data or you have selected the wrong line break');
    // } else {
    //   const identifiers = [];
    //   for (let i = this.options.numHeaderRows; i < rows.length; i++) {
    //     const cells = rows[i].split(this.options.columnSeparator);
    //     if (cells[this.options.indexIdentifierColumn]) {
    //       identifiers.push(cells[this.options.indexIdentifierColumn]);
    //     }
    //   }
    //   this.fileUploadStarted.emit(identifiers.length);
    // }
  }

}
