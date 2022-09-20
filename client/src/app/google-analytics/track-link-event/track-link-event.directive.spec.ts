import { TrackLinkEventDirective } from './track-link-event.directive';
import { GoogleAnalyticsService } from '../google-analytics.service';

describe('TrackLinkEventDirective', () => {
  it('should create an instance', () => {
    const directive = new TrackLinkEventDirective();
    expect(directive).toBeTruthy();
  });
});
