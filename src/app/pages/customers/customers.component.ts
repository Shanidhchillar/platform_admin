import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableData1: TableData;
  displayedColumns: string[] = ['ID', 'Name', 'Phone'];
  dataRows: string[][];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPageOptions: number[] = [5, 10, 25, 50];
  searchValue: string = '';
    customerService: any;
    filteredData: string[][];

    dataSource: any;

  constructor() { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
        (data: any[]) => {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Phone'],
      dataRows: data.map(customer => [
        customer.id,
        customer.name,
        customer.phone,
        // customer.city,
        // customer.salary,
        // // You can add more fields as needed
        // 'Action'
      ])
    };
    this.dataSource = new MatTableDataSource(this.tableData1.dataRows);
      this.dataSource.paginator = this.paginator; // Set the paginator
      this.calculateTotalPages();
    },
    (error) => {
      console.error('Error fetching customer data:', error);
      // Handle the error as needed (e.g., show an error message)
    }
  );

    this.filteredData = this.tableData1.dataRows;
    this.calculateTotalPages();
  }

//   filteredData: string[][];

  applyFilter(filterValue: string) {
    this.searchValue = filterValue.toLowerCase();
    this.filteredData = this.tableData1.dataRows.filter(row =>
      row.some(cell => cell.toLowerCase().includes(this.searchValue))
    );
    this.calculateTotalPages();
    this.paginator.firstPage();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
  }

  getPaginatedData(): string[][] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.applyFilter(this.searchValue);
  }
  

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.applyFilter(this.searchValue);
  }
}


