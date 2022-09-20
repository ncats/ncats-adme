import { Directive, OnInit, OnDestroy, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { HTMLInputEvent } from './html-input-event.model';

@Directive({
  selector: '[admeFileSelect]'
})
export class FileSelectDirective implements OnInit, OnDestroy {
  @Input() accept: string;
  @Output() selectedFile: EventEmitter<File> = new EventEmitter();
  private fileInputElement: HTMLInputElement;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.addHiddenFileInput();
  }

  ngOnDestroy() {
    document.body.removeChild(this.fileInputElement);
  }

  addHiddenFileInput() {
    this.fileInputElement = document.createElement('INPUT') as HTMLInputElement;
    this.fileInputElement.setAttribute('type', 'file');
    this.fileInputElement.style.width = '0';
    this.fileInputElement.style.height = '0';
    this.fileInputElement.style.overflow = 'hidden';

    if (this.accept) {
      this.fileInputElement.setAttribute('accept', this.accept);
    }

    this.fileInputElement.onchange = (event: HTMLInputEvent) => {
      if (event.target.files && event.target.files.length > 0) {
        this.selectedFile.emit(event.target.files[event.target.files.length - 1]);
      }
      event.preventDefault();
    };

    document.body.appendChild(this.fileInputElement);

    const fileInputElement = this.fileInputElement;
    const clickFileInputElement = () => {
      fileInputElement.click();
    };

    this.el.nativeElement.addEventListener('click', clickFileInputElement);
  }
}
