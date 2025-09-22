import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastService } from '../../../core/services/swal/toast.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-file',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss'
})
export class InputFileComponent implements OnChanges{

  @Output() fileSelected = new EventEmitter<File | null>();
  private _file: File | string | null = null;

  @Input() set file(value: File | string | null) {
    this._file = value;

    if (typeof value === 'string') {
      this.fileName = value.split('/').pop() || value;
    } else if (value instanceof File) {
      this.fileName = value.name;
    } else {
      this.fileName = '';
    }
  };

  get file(): File | string | null {
    return this._file;
  };

  dragging = false;
  fileName = '';

  toasts = inject(ToastService);

  ngOnChanges(): void {
    if (!this.file) {
      this.fileName = '';
    }
  };

  onFileDropped(event: DragEvent):void {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.fileName = file.name;
        this.fileSelected.emit(file);
      } else {
        this.toasts.setTimerEnabled(false);
        this.toasts.error("Insira uma imagem!")
        this.removeFile(event);
      };
    };
  };

  onDragOver(event: DragEvent):void {
    event.preventDefault();
    this.dragging = true;
  };

  onDragLeave(event: DragEvent):void {
    event.preventDefault();
    this.dragging = false;
  };

  onFileInputChange(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.fileName = file.name;
        this.fileSelected.emit(file);
      } else {
        this.toasts.setTimerEnabled(false);
        this.toasts.error("Insira uma imagem!")
        this.removeFile(new MouseEvent('click'));
      };
    };
  };

  removeFile(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileName = '';
    this.fileSelected.emit(null);
  };

};
