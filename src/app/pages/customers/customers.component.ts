
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';

export interface PeriodicElement {
  ID: number;
  customerName: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'customerName', 'phone','view'];
  originalData: PeriodicElement[] = [];
  pageSize: number = 1;
  pageIndex = 1;
  Tcount: number = 0;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  searchQuery: string = ''; // Initialize searchQuery
  ID: number = 1;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.getCustomers();
  }
  viewCustomerDetails(customer: PeriodicElement) {
    // this.router.navigate(['customer_history']);
    this.router.navigate(['customer-history']);
    // Implement the logic to navigate to the customer details page or show details in a dialog.
    console.log(`View details for customer with ID: ${customer.ID}`);
    
    // Add your navigation logic or open a dialog to show customer details.
  }
  getCustomers() {
    this.isLoading = true;

    const page = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    // Pass searchQuery to the API call
    this.service.post({ page, limit, searchQuery: this.searchQuery }, '/api/v1/admin/customer-listing').subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.originalData = response.data.customers.map(
            (customer: any) => ({
              ID: this.ID++,
              customerName: customer.customerName,
              phone: customer.phone,
            })
          );

          this.Tcount = response.data.totalPages;
          this.pageSizeOptions = this.calculatePageSizeOptions(this.Tcount);

          // Assign the data to dataSource
          this.dataSource = [...this.originalData];
        } else if (response.statusCode === '500') {
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

  calculatePageSizeOptions(Tcount: number): number[] {
    const options: number[] = [];
    for (let i = 5; i <= Tcount; i += 5) {
      options.push(i);
    }
    return options;
  }

  applyFilter(filterValue: string) {
    // Update the searchQuery with the provided filterValue
    this.searchQuery = filterValue.toLowerCase();
  
    // Reset pagination on filter application
    this.paginator.firstPage();
  
    // Call getCustomers with the updated searchQuery
    this.getCustomers();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCustomers();
  }

  // CreateDoctor() {
  //   this.router.navigate(['create_doctor']);
  // }
}
