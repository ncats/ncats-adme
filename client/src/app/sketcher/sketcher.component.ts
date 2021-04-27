import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { Ketcher } from './ketcher.model';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingService } from '../loading/loading.service';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'adme-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.scss']
})
export class SketcherComponent implements OnInit {
  ketcherSrc: SafeResourceUrl;
  private ketcher: Ketcher;
  @ViewChild('ketcherFrame', { static: true }) ketcherFrame: { nativeElement: HTMLIFrameElement };
  @Output() moleculeInput = new EventEmitter<string>();

  constructor(
    private domSanatizer: DomSanitizer,
    private loadingService: LoadingService,
    @Inject(APP_BASE_HREF) public baseHref: string
  ) {
    this.ketcherSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${baseHref}assets/ketcher/ketcher.html`);
  }

  ngOnInit(): void {
    // this.loadingService.setLoadingState(true);
    this.ketcherFrame.nativeElement.onload = () => {
      // tslint:disable-next-line:no-string-literal
      this.ketcher = this.ketcherFrame.nativeElement.contentWindow['ketcher'];
      this.loadingService.setLoadingState(false);
    };
  }

  addMolecule(): void {
    const smiles = this.ketcher.getSmiles();
    this.moleculeInput.emit(smiles);
  }

}
