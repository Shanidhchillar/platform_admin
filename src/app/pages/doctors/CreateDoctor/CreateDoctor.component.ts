// import { Component, OnInit } from '@angular/core';


// @Component({
//   selector: 'app-CreateDoctor',
//   templateUrl: './CreateDoctor.component.html',
//   styleUrls: ['./CreateDoctor.component.scss']
// })
// export class CreateDoctorComponent implements OnInit {

//   constructor() { }


//   ngOnInit() {
//   }

// }


import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from './SweetAlertService';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './createDoctor.component.html',
  styleUrls: ['./createDoctor.component.css']
})
export class CreateDoctorComponent {
  
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
  }