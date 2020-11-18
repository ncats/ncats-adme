import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'adme-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit, OnDestroy {
  dataDownloadHref: SafeUrl;
  model = 'rlm';
  subscription: Subscription;

  constructor(
    private domSanatizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {
    this.dataDownloadHref = domSanatizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}assets/rlm_public_set.xlsx`);
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.model = params['model'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
