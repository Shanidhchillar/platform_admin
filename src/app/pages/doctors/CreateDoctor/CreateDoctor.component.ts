import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from './SweetAlertService';
import { Router } from '@angular/router';
import { CreateDoctorsDataService } from 'app/services/createDoctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './createDoctor.component.html',
  styleUrls: ['./createDoctor.component.css']
})


export class CreateDoctorComponent implements OnInit {

  doctorName: string = '';
  doctorQualification: string = '';
  doctorDesignation: string = '';
  doctorDescription: string = '';
  businessType: string = '';

  doctorForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private sweetAlertService: SweetAlertService,
      private router: Router,
      private createDoctorsDataService: CreateDoctorsDataService,
      private snackbarService: SnackbarService
      ) {}

    ngOnInit() {
        // Initialize your form with validators
      this.doctorForm = this.formBuilder.group({
        businessType: ['', Validators.required],
        doctorName: ['', Validators.required],
        doctorQualification: ['', Validators.required],
        doctorDesignation: ['', Validators.required],
        doctorDescription: ['', Validators.required],
        // Add more fields and validators as needed
      });
  
      // You can log the form's validity here
      console.log('Form is valid:', this.doctorForm.valid);
    }  
  
    showSweetAlert() {
      const options = {
        title: 'Popup Form',
        html: '<label for="inputName">Designation Name:</label><input type="text" id="inputName" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Close',
      };
  
      this.sweetAlertService.show(options).then((result) => {
        if (result.isConfirmed) {
          // Save logic here (result.value contains the input value if any)
        }
      });
    }
    CreateBank() {
      // Check if the form is valid
      if (this.doctorForm.valid) {

        console.log('Doctor Name:', this.doctorForm.get('doctorName').value);
        console.log('Doctor Qualification:', this.doctorQualification);
        // Save data using the service
        const doctorData = {
          doctor_name: this.doctorForm.get('doctorName').value,
          qualification: this.doctorForm.get('doctorQualification').value,
          designation: this.doctorForm.get('doctorDesignation').value,
          description: this.doctorForm.get('doctorDescription').value,
          business_type: this.doctorForm.get('businessType').value
        };
  
        // Save the data using the service
        this.createDoctorsDataService.createDoctorsData = doctorData;
        console.log('console for the create doctor', this.createDoctorsDataService.createDoctorsData)
  
        this.router.navigate(['bank']);
      } else {
        // Optionally, you can show a message or perform some other action when the form is not valid
        console.log('Form is not valid. Cannot proceed with navigation.');
        this.snackbarService.showCustomSnackBarError('Form is not valid. Cannot proceed with navigation.');
      }
    }
  }

  