import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { UIService } from '../app-services/ui.service';

@Component({
  selector: 'ui-ele',
  templateUrl: './ui.html',
  styleUrls: ['./ui.scss'],
})
export class UIComponent {
  @ViewChild('add', { static: true })
  private _add!: ElementRef;
  pClick!: Observable<PointerEvent>;
  private stopSub$ = new Subject();
  
  constructor(private ui: UIService) {}
  ngOnInit() {
    this.pClick = fromEvent(this._add.nativeElement, 'click');
    this.pClick
      .pipe(takeUntil(this.stopSub$))
      .subscribe((event) => (this.ui.updateAdd = event));
  }
  ngOnDestroy() {
    this.$stopSub;
  }

  private $stopSub = () => {
    this.stopSub$.next(null);
    this.stopSub$.complete();
  };
}
