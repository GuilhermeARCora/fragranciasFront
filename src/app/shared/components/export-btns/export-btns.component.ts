import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfMakeInstance: any = null;

async function getPdfMake() {
  if (pdfMakeInstance) return pdfMakeInstance;
  const pdfLib = await import('pdfmake/build/pdfmake');
  const pdfFonts = await import('pdfmake/build/vfs_fonts');
  pdfLib.default.vfs = pdfFonts.vfs;
  pdfMakeInstance = pdfLib.default;
  return pdfMakeInstance;
};

@Component({
  selector: 'app-export-btns',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './export-btns.component.html',
  styleUrl: './export-btns.component.scss'
})
export class ExportBtnsComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) columns: { key: string; label: string }[] = [];

  // ----------------------------
  // EXPORT TO EXCEL (ExcelJS)
  // ----------------------------
  exportToExcel(): void {
    if (!this.columns?.length || !this.data?.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');

    const headerLabels = this.columns.map(c => c.label);
    const headerRow = worksheet.addRow(headerLabels);
    headerRow.eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00695C' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Data rows
    this.data.forEach(item => {
      const rowValues = this.columns.map(c => this.formatValue(item[c.key]));
      worksheet.addRow(rowValues);
    });

    // Auto-width
    worksheet.columns.forEach(col => {
      const lengths = col.values?.map(v => (v ? v.toString().length : 10)) || [10];
      const maxLength = Math.max(...lengths);
      col.width = maxLength < 15 ? 15 : maxLength;
    });

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      FileSaver.saveAs(blob, 'dados.xlsx');
    });
  };

  // ----------------------------
  // EXPORT TO PDF
  // ----------------------------
  exportToPDF(): void {
    if (!this.columns?.length) return;

    getPdfMake().then(pdfMake => {
      const headers = this.columns.map(c => c.label);
      const body = this.data.map(row => this.columns.map(c => row[c.key]));

      const docDefinition: TDocumentDefinitions = {
        content: [
          { text: 'Exported Data', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: Array(headers.length).fill('auto'),
              body: [headers, ...body]
            }
          }
        ],
        styles: {
          header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] }
        },
        pageOrientation: headers.length > 5 ? 'landscape' : 'portrait'
      };

      pdfMake.createPdf(docDefinition).download('dados.pdf');
    });
  };

  // ----------------------------
  // EXPORT TO CSV
  // ----------------------------
  exportToCSV(): void {
    if (!this.columns?.length) return;

    const headers = this.columns.map(c => `"${c.label}"`).join(';');
    const rows = this.data.map(row =>
      this.columns
        .map(c => `"${this.formatValue(row[c.key]).replace(/"/g, '""')}"`)
        .join(';')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'dados.csv');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatValue(value: any): string {
    if (Array.isArray(value)) {
      return value.map(v => this.formatValue(v)).join(', ');
    } else if (typeof value === 'object' && value !== null) {
      // Tenta usar uma chave "nome" se existir, senão serializa tudo
      if ('nome' in value) return value.nome;
      return JSON.stringify(value);
    } else if (value === null || value === undefined) {
      return '';
    }
    return value.toString();
  };

};
