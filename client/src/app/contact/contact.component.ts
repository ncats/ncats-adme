import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DEPLOY_URL } from '../utilities/deploy-url';

@Component({
  selector: 'adme-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  vishalImgSrc: SafeResourceUrl;
  pranavImgSrc: SafeResourceUrl;
  jorgeImgSrc: SafeResourceUrl;
  jordanImgSrc: SafeResourceUrl;
  noelImgSrc: SafeResourceUrl;
  trungImgSrc: SafeResourceUrl;
  xinImgSrc: SafeResourceUrl;
  rdkitImgSrc: SafeResourceUrl;
  pythonImgSrc: SafeResourceUrl;
  angularImgSrc: SafeResourceUrl;
  epamImgSrc: SafeResourceUrl;

  constructor(
    private domSanatizer: DomSanitizer,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {
    this.vishalImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/siramshettyv2.jpg`);
    this.pranavImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/shahpa2.png`);
    this.jorgeImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/neyraj2.jpg`);
    this.jordanImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/williamsjos.jpg`);
    this.noelImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/southalln.jpg`);
    this.trungImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/nguyenda.png`);
    this.xinImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/xux7.jpg`);

    this.rdkitImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/rdkit.png`);
    this.pythonImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/python.png`);
    this.angularImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/angular.png`);
    this.epamImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/epam_ketcher.png`);
  }

  ngOnInit(): void {
  }

}
