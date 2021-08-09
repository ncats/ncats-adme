import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ResolveEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';
import { DOCUMENT } from '@angular/common';
import { DEPLOY_URL } from './utilities/deploy-url';

@Component({
  selector: 'adme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private gaService: GoogleAnalyticsService,
    // tslint:disable-next-line:variable-name
    @Inject(DOCUMENT) private _document: HTMLDocument,
    @Inject(DEPLOY_URL) private deployUrl: string
  ) {
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/icons/cancel-24px.svg`));
  }
  ngOnInit() {
    this._document.getElementById('appFavicon').setAttribute('href', `${this.deployUrl}assets/icons/favicon.ico`);
    this.routerSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ResolveEnd) {
        this.gaService.sendPageView(event.state.root.firstChild.data.pageTitle, event.state.url);
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription != null) {
      this.routerSubscription.unsubscribe();
    }
  }
}
