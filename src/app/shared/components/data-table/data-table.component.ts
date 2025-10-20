import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AfterViewInit, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CustomPaginatorIntl } from '../../utils/custom-paginator-intl';
import { CommonModule } from '@angular/common';
import { PipeRegistryService } from '../../../core/services/pipeRegistry/pipe-registry.service';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';

export interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
  pipe?: string;
  pipeArgs?:any[];
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
    MatTooltip
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: CustomPaginatorIntl }
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T extends Record<string, any>> implements OnInit, AfterViewInit {

  @Input({required:true}) data$!: Observable<T[]>;
  @Input() displayedColumns: ColumnDef[] = [];
  @Input() useBtnEdit: boolean = true;
  @Input() useBtnActive: boolean = true;
  @Input() useBtnStatus: boolean = false;
  @Input() useBtnLink: boolean = false;
  @Input() useBtnRemove: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() active = new EventEmitter<any>();
  @Output() status = new EventEmitter<any>();
  @Output() link = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

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

  /** Colunas visíveis (se nenhuma for passada, usa as auto geradas) */
  get visibleColumns(): ColumnDef[] {
    return (this.displayedColumns.length > 0 ? this.displayedColumns : this.autoColumns).filter(c => c.visible);
  };

  /** Apenas os nomes das colunas (para o [displayedColumns]) */
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

  formatValue(column: ColumnDef, value: any): string | null {
    if (!column.pipe) return value;
    return this.pipeRegistry.apply(column.pipe, value, ...(column.pipeArgs || []));
  };

  onEdit(element: object):void {
    this.edit.emit(element);
  };

  onChangeActive(element: object):void {
    this.active.emit(element);
  };

  onChangeStatus(element: object):void {
    this.status.emit(element);
  };

  onChangeLink(element: object):void {
    this.link.emit(element);;
  };

  onChangeRemove(element: object):void {
    this.remove.emit(element);;
  };

};
