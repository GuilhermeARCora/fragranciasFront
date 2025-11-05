import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-standard-btn',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './standard-btn.component.html',
  styleUrl: './standard-btn.component.scss'
})
export class StandardBtnComponent {

  @Output() event = new EventEmitter();

  breakPointService = inject(BreakPointService);
  destroyRef = inject(DestroyRef);

  added = signal<boolean>(false);

  action(event : MouseEvent):void{
    this.event.emit(event);

    this.added.set(true);

    timer(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.added.set(false));
  };

};
