import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from './SweetAlertService';
import { Router } from '@angular/router';
import { CreateDoctorsDataService } from 'app/services/createDoctor.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './createDoctor.component.html',
  styleUrls: ['./createDoctor.component.css']
})
export class CreateDoctorComponent {

  doctorName: string = '';
  doctorQualification: string = '';
  doctorDesignation: string = '';
  doctorDescription: string = '';
  businessType: string = '';
  
    constructor(
      private sweetAlertService: SweetAlertService,
      private router: Router,
      private createDoctorsDataService: CreateDoctorsDataService
      ) {}
  
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
      // Save data using the service
      const doctorData = {
        doctor_name: this.doctorName,
        qualification: this.doctorQualification,
        designation: this.doctorDesignation,
        description: this.doctorDescription,
        business_type: this.businessType
      };

      // Save the data using the service
      this.createDoctorsDataService.createDoctorsData = doctorData;
      console.log('console for the create doctor',this.createDoctorsDataService.createDoctorsData)

      this.router.navigate(['bank']);
    }
  }

  