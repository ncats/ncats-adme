import { Injectable, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from '../config/config.service';
import { SendFields } from './google-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private googleAnanlyticsId: string;
  private analyticsObjectKey: string;
  private isActive = false;

  constructor(
    public configService: ConfigService,
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)
      && configService.configData
      && configService.configData.googleAnalyticsId) {
      this.googleAnanlyticsId = configService.configData.googleAnalyticsId;
      this.init();
    }
  }

  init() {

    let analyticsObjectKey;

    this.analyticsObjectKey = analyticsObjectKey = Math.random().toString(36).replace('0.', '');

    // tslint:disable-next-line:no-string-literal
    window['GoogleAnalyticsObject'] = this.analyticsObjectKey;

    window[this.analyticsObjectKey] = window[this.analyticsObjectKey] || (() => {
      // tslint:disable-next-line:no-string-literal
      (window[analyticsObjectKey]['q'] = window[analyticsObjectKey] && window[analyticsObjectKey]['q'] || []).push(arguments);
    });

    window[this.analyticsObjectKey].l = + new Date();

    window[this.analyticsObjectKey]('create', this.googleAnanlyticsId, { cookieName: 'admeCookie' });
    window[this.analyticsObjectKey]('set', 'screenResolution', `${window.screen.availWidth}x${window.screen.availHeight}`);

    window[this.analyticsObjectKey]('set', 'hostname', window.location.hostname);

    this.isActive = true;

    const node = document.createElement('script');
    node.src = 'https://www.google-analytics.com/analytics.js';
    node.type = 'text/javascript';
    node.async = true;
    // node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  @HostListener('window:error', ['$event'])
  onGlobalError(event) {
    const errorDescription = `message: ${event.message} | filenname: ${event.filename} | lineno: ${event.lineno} | colno: ${event.colno}`;
    this.sendException(errorDescription);
  }

  sendPageView(title?: string, path?: string): void {
    if (this.isActive) {
      if (path == null && title != null) {
        path = `/${title.replace(/ /g, '-').toLowerCase()}`;
      }

      const sendFields: SendFields = {
        hitType: 'pageview',
        title,
        page: path,
        viewportSize: `${window.innerHeight}x${window.innerWidth}`
      };
      window[this.analyticsObjectKey]('send', sendFields);
    }
  }

  sendEvent(eventCategory?: string, eventAction?: string, eventLabel?: string, eventValue?: number): void {

    if (this.isActive) {
      const sendFields: SendFields = {
        hitType: 'event',
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        viewportSize: `${window.innerHeight}x${window.innerWidth}`
      };

      window[this.analyticsObjectKey]('send', sendFields);
    }
  }

  sendException(exDescription: string, exFatal: boolean = false): void {
    if (this.isActive) {
      const sendFields: SendFields = {
        hitType: 'exception',
        exDescription,
        exFatal,
        viewportSize: `${window.innerHeight}x${window.innerWidth}`
      };

      window[this.analyticsObjectKey]('send', sendFields);
    }
  }
}
