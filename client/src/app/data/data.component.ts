import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DEPLOY_URL } from '../utilities/deploy-url';

@Component({
  selector: 'adme-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})

export class DataComponent implements OnInit {
  rlm_DownloadHref: SafeUrl;
  pampa74_DownloadHref: SafeUrl;
  pampa50_DownloadHref: SafeUrl;
  sol_DownloadHref: SafeUrl;
  hlc_DownloadHref: SafeUrl;
  cyp2d6_DownloadHref: SafeUrl;
  cyp3a4_DownloadHref: SafeUrl;
  cyp2c9_DownloadHref: SafeUrl;
  downloadIcon: SafeUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {
    this.rlm_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508591_datatable_all.csv`);
    this.pampa74_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508612_datatable_all.csv`);
    this.pampa50_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645871_datatable_all.csv`);
    this.sol_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645848_datatable_all.csv`);
    this.hlc_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508603_datatable_all.csv`);
    this.cyp2d6_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645840_datatable_all.csv`);
    this.cyp3a4_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645841_datatable_all.csv`);
    this.cyp2c9_DownloadHref = domSanitizer.bypassSecurityTrustResourceUrl(`https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645842_datatable_all.csv`);
    this.downloadIcon = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/icons/download.svg`);
  }

  ngOnInit(): void {
  }

}
