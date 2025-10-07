import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-standard-btn',
  imports: [],
  templateUrl: './standard-btn.component.html',
  styleUrl: './standard-btn.component.scss'
})
export class StandardBtnComponent {

  @Output() event = new EventEmitter();
  @Input({required:true}) title!:string;

  action(event : MouseEvent):void{
    this.event.emit(event);
  };

};
