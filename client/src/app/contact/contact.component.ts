import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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
    private domSanatizer: DomSanitizer
  ) {
    this.vishalImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/siramshettyv2.jpg`);
    this.pranavImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/shahpa2.png`);
    this.jorgeImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/neyraj2.jpg`);
    this.jordanImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/williamsjos.jpg`);
    this.noelImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/southalln.jpg`);
    this.trungImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/nguyenda.png`);
    this.xinImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/profile_images/xux7.jpg`);

    this.rdkitImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/images/rdkit.png`);
    this.pythonImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/images/python.png`);
    this.angularImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/images/angular.png`);
    this.epamImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/images/epam_ketcher.png`);
  }

  ngOnInit(): void {
  }

}
