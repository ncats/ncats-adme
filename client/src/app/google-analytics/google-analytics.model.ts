export type HitType = 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';

export interface SendFields {
    hitType?: HitType;
    page?: string;
    title?: string;
    sessionControl?: 'start' | 'end';
    eventCategory?: string;
    eventAction?: string;
    eventLabel?: string;
    eventValue?: number;
    exDescription?: string;
    exFatal?: boolean;
    viewportSize?: string;
}
