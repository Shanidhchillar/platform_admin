
import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from './SweetAlertService';


@Component({
  selector: 'app-edit-doctor',
  templateUrl: './editDoctor.component.html',
  styleUrls: ['./editDoctor.component.css']
})
export class EditDoctorComponent {
    router: any;
  
    constructor(private sweetAlertService: SweetAlertService) {}
  
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
    onSaveAndContinue() {
        // Perform any save operations if needed
    
        // Navigate to the 'bank' component
        this.router.navigate(['/bank']);
      }
  }