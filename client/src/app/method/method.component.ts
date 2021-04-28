import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DEPLOY_URL } from '../utilities/deploy-url';

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
    private activatedRoute: ActivatedRoute,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {
    this.dataDownloadHref = domSanatizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/rlm_public_set.xlsx`);
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
