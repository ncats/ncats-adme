export type HitType = 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';

export interface GAPageView {
    page_title: string;
    page_location?: string;
    page_path?: string;
}

export interface GAEvent {
    event_category?: string;
    event_label?: string;
    value?: number;
}

export interface GAException {
    description: string;
    fatal?: boolean;
}
