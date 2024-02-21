import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  public tableData1: TableData;
  displayedColumns: string[] = ['ID', 'Name', 'Country', 'City', 'Salary'];
  dataRows: string[][];

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

    // Initialize filteredData with the initial data
    this.filteredData = this.tableData1.dataRows;
  }

  filteredData: string[][];

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase();

    // Filter the data based on the input value
    this.filteredData = this.tableData1.dataRows.filter(row =>
      row.some(cell => cell.toLowerCase().includes(filterValue))
    );

    
  }
}
