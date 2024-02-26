// doctors.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';

export interface PeriodicElement {
  ID: number;
  doctor_name: string;
  doctor_phone: string;
  entity_name: number;
  department_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'doctor_name', 'doctor_phone', 'entity_name', 'department_name', 'actions'];
  originalData: PeriodicElement[] = [];
  pageSize: number = 5;
  pageIndex = 0;
  Tcount: number = 0;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  searchQuery: string = ''; // Initialize searchQuery

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.isLoading = true;

    const page = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    // Pass searchQuery to the API call
    this.service.post({ page, limit, searchQuery: this.searchQuery }, '/api/v1/auth/list-doctors/').subscribe(
      (response) => {
        if (response.statusCode === '200') {
          this.originalData = response.data.response.map(
            (doctor: any) => ({
              ID: doctor.doctor_id,
              doctor_name: doctor.doctor_name,
              doctor_phone: doctor.doctor_phone,
              entity_name: doctor.entity_name,
              department_name: doctor.department_name,
            })
          );

          this.Tcount = response.data.totalCount;
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
  
    // Call getDoctors with the updated searchQuery
    this.getDoctors();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getDoctors();
  }

  CreateDoctor() {
    this.router.navigate(['create_doctor']);
  }

  // Function to handle edit button click
  editDoctor(doctor: PeriodicElement) {
    this.router.navigate(['edit_doctor']);
    // Implement your logic for handling edit action
    console.log('Edit Doctor:', doctor);
  }

  // Function to handle delete button click
  deleteDoctor(doctor: PeriodicElement) {
    // Implement your logic for handling delete action
    console.log('Delete Doctor:', doctor);
  }
}
