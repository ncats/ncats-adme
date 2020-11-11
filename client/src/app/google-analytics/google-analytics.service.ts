import { Injectable, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from '../config/config.service';
import { GAPageView, GAEvent, GAException } from './google-analytics.model';

@Injectable({
  providedIn: 'root'
})
// tslint:disable:no-string-literal
export class GoogleAnalyticsService {
  private googleAnanlyticsId: string;
  private isActive = false;
  private gtag: any;

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
    this.gtag = window['gtag'];
    this.gtag('config', 'G-RM2JHGHYEK', { send_page_view: false });
    this.isActive = true;
  }

  @HostListener('window:error', ['$event'])
  onGlobalError(event) {
    const errorDescription = `message: ${event.message} | filenname: ${event.filename} | lineno: ${event.lineno} | colno: ${event.colno}`;
    this.sendException(errorDescription);
  }

  sendPageView(title?: string, path: string = location.href): void {
    if (this.isActive) {

      const sendFields: GAPageView = {
        page_title: title,
        page_path: path
      };
      console.log(this.gtag);
      this.gtag('config', this.googleAnanlyticsId, sendFields);
    }
  }

  sendEvent(eventAction: string, eventCategory?: string, eventLabel?: string, eventValue?: number): void {

    if (this.isActive) {
      const sendFields: GAEvent = {
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue
      };
      this.gtag('event', eventAction, sendFields);
    }
  }

  sendException(exDescription: string, exFatal: boolean = false): void {
    if (this.isActive) {
      const sendFields: GAException = {
        description: exDescription,
        fatal: exFatal
      };

      this.gtag('event', 'exception', sendFields);
    }
  }
}
