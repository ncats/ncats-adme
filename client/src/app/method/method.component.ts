import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'adme-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit {
  dataDownloadHref: SafeUrl;

  constructor(
    private domSanatizer: DomSanitizer
  ) {
    this.dataDownloadHref = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/rlm_public_set.xlsx`);
  }

  ngOnInit(): void {
  }

}
