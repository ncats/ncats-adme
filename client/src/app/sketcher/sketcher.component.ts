import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ketcher } from './ketcher.model';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'adme-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.scss']
})
export class SketcherComponent implements OnInit {
  ketcherSrc: SafeResourceUrl;
  @ViewChild('ketcherFrame', { static: true }) ketcherFrame: { nativeElement: HTMLIFrameElement };
  @Output() ketcherOnLoad = new EventEmitter<Ketcher>();

  constructor(
    private domSanatizer: DomSanitizer
  ) {
    this.ketcherSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/ketcher/ketcher.html`);
  }

  ngOnInit(): void {
    this.ketcherFrame.nativeElement.onload = () => {
      // tslint:disable-next-line:no-string-literal
      this.ketcherOnLoad.emit(this.ketcherFrame.nativeElement.contentWindow['ketcher']);
    };
  }

}
