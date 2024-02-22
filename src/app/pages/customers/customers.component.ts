// doctors.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';

export interface PeriodicElement {
  ID: number;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'Name', 'Phone'];
  originalData: PeriodicElement[] = [];
  pageSize: number = 5;
  pageIndex = 0;
  Tcount: number = 0;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.isLoading = true;

    const page = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    this.service.post({ page, limit }, '/api/v1/booking/listCustomers/').subscribe(
      (response) => {
        if (response.statusCode === '200') {
          console.log("helllooooooooooooooooooooooooooooo")
          this.originalData = response.data.response.map(
            (services: any, index: number) => ({
              ID: page + index + 1,
              name: services.name,
              phone: services.phone
            })
          );

          this.Tcount = response.Tcount;
          this.pageSizeOptions = this.calculatePageSizeOptions(this.Tcount);
        } else if (response.code === '500') {
          this.snackbarService.showCustomSnackBarError(
            response.servicesList
          );
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

  calculatePageSizeOptions(Tcount: number): number[] {
    const options: number[] = [];
    for (let i = 5; i <= Tcount; i += 5) {
      options.push(i);
    }
    return options;
  }

  applyFilter(filterValue: string) {
    this.searchValue = filterValue.toLowerCase();
    // Filter the data based on your specific requirements
    // You might need to implement a custom filtering logic based on your data structure
    // For simplicity, I'm filtering by ID here
    this.originalData = this.originalData.filter((row) =>
      row.ID.toString().includes(this.searchValue)
    );

    this.paginator.firstPage();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCustomers();
  }

//   CreateDoctor() {
//     this.router.navigate(['create_doctor']);
//   }
}

