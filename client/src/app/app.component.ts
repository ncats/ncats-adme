import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ResolveEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';
import { DOCUMENT } from '@angular/common';
import { DEPLOY_URL } from './utilities/deploy-url';
import * as moment from 'moment';

@Component({
  selector: 'adme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  data: any = [];
  release_date: string;
  release_url: string;
  tag_name: string;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private gaService: GoogleAnalyticsService,
    private http: HttpClient,
    // tslint:disable-next-line:variable-name
    @Inject(DOCUMENT) private _document: HTMLDocument,
    @Inject(DEPLOY_URL) private deployUrl: string
  ) {
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/icons/cancel-24px.svg`));
  }
  getReleaseData(){
   const url ='https://api.github.com/repos/ncats/ncats-adme/releases/latest'
   this.http.get(url).subscribe((res)=>{
     this.data = res
     this.release_date = moment.utc(this.data.published_at).local().format('DD/MM/YYYY');
     this.release_url = this.data.html_url
     this.tag_name = this.data.tag_name
   })
  }
  ngOnInit() {
    this._document.getElementById('appFavicon').setAttribute('href', `${this.deployUrl}assets/icons/favicon.ico`);
    this.routerSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ResolveEnd) {
        this.gaService.sendPageView(event.state.root.firstChild.data.pageTitle, event.state.url);
      }
    });
    this.getReleaseData();
  }
  ngOnDestroy() {
    if (this.routerSubscription != null) {
      this.routerSubscription.unsubscribe();
    }
  }
}
