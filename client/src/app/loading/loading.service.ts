import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStateEmitter: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  get isLoading(): Observable<boolean> {
    return this.loadingStateEmitter.asObservable();
  }

  setLoadingState(isLoading: boolean): void {
    this.loadingStateEmitter.next(isLoading);
  }
}
