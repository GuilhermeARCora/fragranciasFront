import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-input-auto-complete',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './header-input-auto-complete.component.html',
  styleUrl: './header-input-auto-complete.component.scss'
})
export class HeaderInputAutoCompleteComponent {

  @Output() event = new EventEmitter<any>();

  openSearchInput(event : MouseEvent){
    this.event.emit(event);
  };

};
