import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableData1: TableData;
  displayedColumns: string[] = ['ID', 'Name', 'Country', 'City', 'Salary'];
  dataRows: string[][];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPageOptions: number[] = [5, 10, 25, 50];
  searchValue: string = '';

  constructor() { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
        ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };

    this.filteredData = this.tableData1.dataRows;
    this.calculateTotalPages();
  }

  filteredData: string[][];

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
