import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseDestroyDirective implements OnDestroy {
  protected _destroy$: Subject<void> = new Subject<void>();

  protected constructor() {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
