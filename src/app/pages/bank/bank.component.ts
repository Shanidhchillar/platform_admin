import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { CreateDoctorsDataService } from 'app/services/createDoctor.service';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  BankForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private snackbarService: SnackbarService,
    private createDoctorsDataService: CreateDoctorsDataService,
  ) { }

  ngOnInit() {

    this.BankForm = this.formBuilder.group({
      account_no: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      ifsc_code: ['', [Validators.required, Validators.min(10)]],
      bank_name: ['', [Validators.required]],
      account_holder_name: ['', [Validators.required]],
    });
    console.log("=-=-=-=form=-=-",this.BankForm.valid)
  }

  validateForm() {
    console.log("Form value:", this.BankForm.value);
    console.log("Form status:", this.BankForm.status);
    if (this.BankForm.valid) {

      const formValue = {
        phone : this.createDoctorsDataService.createDoctorsData.phone,
        entity_name : this.createDoctorsDataService.createDoctorsData.doctorDesignation,
        email : this.createDoctorsDataService.createDoctorsData.email,
        business_type : this.createDoctorsDataService.createDoctorsData.business_type,
        doctor_name : this.createDoctorsDataService.createDoctorsData.doctor_name,
        qualification : this.createDoctorsDataService.createDoctorsData.qualification,
        consultation_time: this.createDoctorsDataService.createDoctorsData.consultation_time,
        consultation_charge : this.createDoctorsDataService.createDoctorsData.consultation_charge,
        account_no: this.BankForm.get('account_no').value,
        ifsc_code: this.BankForm.get('ifsc_code').value,
        bank_name: this.BankForm.get('bank_name').value,
        account_holder_name: this.BankForm.get('account_holder_name').value,
      };

      this.service.post(formValue, '/api/v1/auth/addProfile').subscribe(
        (response) => {
          if (response.statusCode === 200) {
            console.log("seccess")
            this.snackbarService.showCustomSnackBarSuccess("successsss");
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
  }

}
