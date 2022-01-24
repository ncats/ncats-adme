//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DEPLOY_URL } from '../utilities/deploy-url';

@Component({
  selector: 'adme-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  bannerImgSrc: SafeResourceUrl;

  constructor(
    private domSanatizer: DomSanitizer,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {
    this.bannerImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/banner.png`);
  }


  ngOnInit() {}
}
