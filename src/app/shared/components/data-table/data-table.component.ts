import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CustomPaginatorIntl } from '../../utils/custom-paginator-intl';
import { CommonModule } from '@angular/common';
import { PipeRegistryService } from '../../../core/services/pipeRegistry/pipe-registry.service';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { ExportBtnsComponent } from '../export-btns/export-btns.component';
import type { Observable } from 'rxjs';
import type { AfterViewInit, OnInit } from '@angular/core';

export interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
  pipe?: string;
  pipeArgs?:string[];
};

@Component({
  selector: 'app-data-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatTooltip,
    ExportBtnsComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: CustomPaginatorIntl }
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DataTableComponent<T extends Record<string, any>> implements OnInit, AfterViewInit {

  @Input({ required:true }) data$!: Observable<T[]>;
  @Input() displayedColumns: ColumnDef[] = [];
  @Input() useBtnEdit: boolean = true;
  @Input() useBtnActive: boolean = true;
  @Input() useBtnStatus: boolean = false;
  @Input() useBtnLink: boolean = false;
  @Input() useBtnRemove: boolean = false;
  @Input() isProductList: boolean = false;

  @Output() edit = new EventEmitter<T>();
  @Output() active = new EventEmitter<T>();
  @Output() status = new EventEmitter<T>();
  @Output() link = new EventEmitter<T>();
  @Output() remove = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();
  autoColumns: ColumnDef[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  destroyRef = inject(DestroyRef);
  filterValue: string = '';

  pipeRegistry = inject(PipeRegistryService);

  ngOnInit(): void {
    this.getData();
  };

  getData(): void{
    this.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.dataSource.data = data ?? [];

        // deduz colunas se não forem passadas
        if (data && data.length > 0 && this.displayedColumns.length === 0) {
          this.autoColumns = Object.keys(data[0]).map(key => ({
            key,
            label: key, // default = nome cru,
            visible: true
          }));
        }
      });
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => (this.paginator.pageIndex = 0));
  };

  get columnsToDisplay(): ColumnDef[] {
    return this.displayedColumns ?? this.autoColumns;
  };

  get visibleColumns(): ColumnDef[] {
    return (this.displayedColumns.length > 0 ? this.displayedColumns : this.autoColumns).filter(c => c.visible);
  };

  get columnKeys(): string[] {
    return this.visibleColumns.map(c => c.key);
  };

  applyFilter():void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  };

  clearFilter():void {
    this.filterValue = '';
    this.dataSource.filter = '';
  };

  formatValue(column: ColumnDef, value: string): string | null {
    if (!column.pipe) return value;
    return this.pipeRegistry.apply(column.pipe, value, ...(column.pipeArgs || []));
  };

  onEdit(element: T):void {
    this.edit.emit(element);
  };

  onChangeActive(element: T):void {
    this.active.emit(element);
  };

  onChangeStatus(element: T):void {
    this.status.emit(element);
  };

  onChangeLink(element: T):void {
    this.link.emit(element);;
  };

  onChangeRemove(element: T):void {
    this.remove.emit(element);;
  };

};
