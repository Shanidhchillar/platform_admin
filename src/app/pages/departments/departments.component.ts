// doctors.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  ID: number;
  department_name: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'department_name', 'status'];
  originalData: PeriodicElement[] = [];
  pageSize: number = 5;
  pageIndex = 0;
  Tcount: number = 0;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  searchQuery: string = ''; // Initialize searchQuery

  selectedDepartment: string | null = null;
  entityList: any[] = [];


  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.getDepartments();
    this.getEntities();
  }

  getDepartments() {
    this.isLoading = true;
  
    // Retrieve the selected entity_id
    const entity_id = this.selectedDepartment;
  
    // Initialize the parameters for the API call
    let apiParams: any = {};
    
    // Check if entity_id is selected and set it as a parameter
    if (entity_id !== null) {
      apiParams = { entity_id };
    }
  
    // Pass the parameters to the API call
    this.service.post(apiParams, '/api/v1/auth/list-departments').subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.originalData = response.data.data.map((department: any) => ({
            ID: department.department_id,
            department_name: department.department_name,
            status: department.status
          }));
  
          this.Tcount = response.data.totalCount;
          this.pageSizeOptions = this.calculatePageSizeOptions(this.Tcount);
  
          // Assign the data to dataSource
          this.dataSource = [...this.originalData];
        } else if (response.statusCode === 404) {
          this.snackbarService.showCustomSnackBarError(response.message);
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
  

  getEntities() {
    const limit = 10;
    this.service.post({ limit }, '/api/v1/auth/list-entity').subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.entityList = response.data.data;
          console.log('Entity List:', this.entityList); // Add this line for debugging
        } else {
          this.snackbarService.showCustomSnackBarError(response.message);
        }
      },
      (error) => {
        console.error('API call failed:', error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
  

  onEntityChange(event: MatSelectChange) {
    // Update selectedDepartment with the value from the entity dropdown
    this.selectedDepartment = event.value;
    
    // Check if selectedDepartment is not null before making the API call
    if (this.selectedDepartment !== null) {
      this.getDepartments();
    }
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
    this.getDepartments();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getDepartments();
  }

//   CreateDoctor() {
//     this.router.navigate(['create_doctor']);
//   }
// }

CreateDepartment() {
    Swal.fire({
        title: 'Add Department',
        html: `
           <div>
           <label for="departmentName">Department Name:</label>
           <input type="text" id="departmentName" class="swal2-input" placeholder="Enter department name" required>
           
           <label for="departmentCode">Department Code:</label>
           <input type="text" id="departmentCode" class="swal2-input" placeholder="Enter department code" required>
           </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save'
    }).then((result) => {
        if (result.isConfirmed) {
            // Retrieve values from the input fields
            const departmentName = (document.getElementById('departmentName') as HTMLInputElement).value;
            const departmentCode = (document.getElementById('departmentCode') as HTMLInputElement).value;

            // Validate input fields (add your validation logic here)
            
            // Perform the actual department creation or any other logic
            const payload = {
                "department_name": departmentName
            };

            // Call the API
            this.service.post(payload, '/api/v1/auth/adddept').subscribe(
                (response) => {
                    if (response.statusCode === "200") {
                        // Successfully added department
                        console.log('Department added:', response.data);
                        // Optionally, perform any other actions (e.g., show success message)
                    } else {
                        // Handle other status codes or error cases
                        console.error('Error adding department:', response.message);
                        // Optionally, show an error message to the user
                        this.snackbarService.showCustomSnackBarError(response.message);
                    }
                },
                (error) => {
                    console.error('API call failed:', error);
                    this.snackbarService.showCustomSnackBarError(error);
                }
            );
        }
    });
}

  

}