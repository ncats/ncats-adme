import { Directive, HostListener, Input } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Directive({
  selector: '[admeTrackLinkEvent]'
})
export class TrackLinkEventDirective {
  @Input() evCategory = 'Undefined';
  @Input() evAction = 'click-link';
  @Input() evLabel: string;
  @Input() evValue: number;

  constructor(
    private gaService: GoogleAnalyticsService
  ) {}

  @HostListener('click', ['$event.target'])
  onClick(element: HTMLAnchorElement) {
    this.evLabel = element.href;
    this.gaService.sendEvent(this.evCategory, this.evAction, this.evLabel, this.evValue);
  }
}
