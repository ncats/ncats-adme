import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DEPLOY_URL } from '../utilities/deploy-url';

@Component({
  selector: 'adme-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  rintaroImgSrc: SafeResourceUrl;
  vishalImgSrc: SafeResourceUrl;
  pranavImgSrc: SafeResourceUrl;
  ewyImgSrc: SafeResourceUrl;
  xinImgSrc: SafeResourceUrl;
  trungImgSrc: SafeResourceUrl;
  noelImgSrc: SafeResourceUrl;
  jorgeImgSrc: SafeResourceUrl;
  jordanImgSrc: SafeResourceUrl;
  rdkitImgSrc: SafeResourceUrl;
  pythonImgSrc: SafeResourceUrl;
  angularImgSrc: SafeResourceUrl;
  epamImgSrc: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {
    this.rintaroImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/kator.jpg`);
    this.vishalImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/siramshettyv2.jpg`);
    this.pranavImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/shahpa2.png`);
    this.ewyImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/mathee.jpg`);
    this.xinImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/xux7.jpg`);
    this.trungImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/nguyenda.png`);
    this.noelImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/southalln.jpg`);
    this.jorgeImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/neyraj2.jpg`);
    this.jordanImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/williamsjos.jpg`);

    this.rdkitImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/rdkit.png`);
    this.pythonImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/python.png`);
    this.angularImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/angular.png`);
    this.epamImgSrc = domSanitizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/epam_ketcher.png`);
  }

  ngOnInit(): void {
  }

}
