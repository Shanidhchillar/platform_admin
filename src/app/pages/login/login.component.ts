// login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private snackbarService: SnackbarService,
    // private userPhoneService : UserPhone
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      userPhone: ['', Validators.required],
     
    });
    console.log('Form Valid:', this.myForm.valid);

  }

  ngOnDestroy() {
  }

  restrictToNumbers(event: any) {
    const input = event.target;
    const regex = /^[0-9]*$/; // Regular expression to match only numbers

    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        this.myForm.get('mpin')?.setValue(input.value)
    }
}
onSubmit() {
  if (this.myForm.valid) {
    const Phone = this.myForm.value.userPhone
    const formValue = {
      userPhone: this.myForm.value.userPhone,
      
      // Add more fields as needed
    };
    console.log(`=-=-=-=form=-=-=-`, formValue);

    // Perform your login logic here

    this.service.post(formValue, "/v1/security/login/").subscribe(
      (response) => {
        console.log(`login success`, response);
        this.myForm.reset();
        if (response.code === "201") {
          // localStorage.setItem('token',response.data.token)
          // localStorage.setItem('user',JSON.stringify(response.data))
          // localStorage.setItem('user_id',response.data.user_id)
          // localStorage.setItem('user_type',response.data.user_type)
          console.log(response.txt);
          // this.userPhoneService.UserPhone = Phone
          // console.log("=-=-=-=phone=-=-=",this.userPhoneService.UserPhone)
          this.router.navigate(['/OTPverify']);
        }else if (response.code === "200") {
          console.log(response.txt);
          // this.userPhoneService.UserPhone = Phone
          // console.log("=-=-=-=phone=-=-=",this.userPhoneService.UserPhone)
          this.router.navigate(['/MPINverify']);
          
        } else if (response.code === "500") {
          console.log(response.login);
          this.snackbarService.showCustomSnackBarError(response.login)
          
        }
        else{
          console.log('Something went wrong!');
          this.snackbarService.showCustomSnackBarError('Something went wrong!')
        }
      },
      (error) => {

        // Handle the error response
        console.error('Login failed:', error);
        this.snackbarService.showCustomSnackBarError(error)
      }
    );
  }
}

  
}
