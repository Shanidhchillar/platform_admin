// report.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';
// import * as jsPDF from 'jspdf';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import autoTable from 'jspdf-autotable'
// declare let jsPDF;
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}


export interface PeriodicElement {
  Id: number;
  customerName: string;
  customerPhone: string;
  doctorName: string;
  amount: number;
  paymentOrderId: string;
  paymentTransactionId: string;
  appointmentDate: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Id', 'customerName', 'customerPhone', 'doctorName', 'amount', 'paymentOrderId', 'paymentTransactionId', 'appointmentDate'];
  originalData: PeriodicElement[] = [];
  pageSize: number = 5;
  pageIndex = 0;
  Tcount: number = 0;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  searchQuery: string = '';
  Id: number = 1;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.getReport();
  }

  getReport() {
    this.isLoading = true;

    const page = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    this.service.post({ page, limit, searchQuery: this.searchQuery }, '/api/v1/payment/transaction-history').subscribe(
      (response) => {
        if (response.statusCode === 200) {
          const responseData = response.data;

          this.originalData = responseData.transactions.map(
            (report: any) => ({
              Id: this.Id++,
              customerName: report.customerName,
              customerPhone: report.customerPhone,
              doctorName: report.doctorName,
              amount: report.amount,
              paymentOrderId: report.paymentOrderId,
              paymentTransactionId: report.paymentTransactionId,
              appointmentDate: report.appointmentDate
            })
          );

          this.Tcount = responseData.totalPages;
          this.pageSizeOptions = this.calculatePageSizeOptions(this.Tcount);

          this.dataSource = [...this.originalData];
        } else if (response.statusCode === 500) {
          this.snackbarService.showCustomSnackBarError(response.servicesList);
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('API call failed:', error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
  exportToPdf() {
    // Create a new instance of jsPDF
    const pdf = new jsPDF();
  
    // Add a title to the PDF
    pdf.text('Transaction Report', 20, 10);
  
    // Extract headers from displayedColumns
    const headers = this.displayedColumns.map(column => column.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase());
  
    // Extract data from dataSource
    const data = this.dataSource.map(row => this.displayedColumns.map(column => row[column]));
  
    // Add a table to the PDF
    pdf.autoTable({
      head: [headers],
      body: data,
      startY: 20
    });
  
    // Save the PDF to a file or open it in a new window
    pdf.save('report.pdf');
  }
  


  calculatePageSizeOptions(Tcount: number): number[] {
    const options: number[] = [];
    for (let i = 5; i <= Tcount; i += 5) {
      options.push(i);
    }
    return options;
  }

  applyFilter(filterValue: string) {
    this.searchQuery = filterValue.toLowerCase();
    this.paginator.firstPage();
    this.getReport();
  }
  
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getReport();
  }
}
