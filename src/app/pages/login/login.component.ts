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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }

onSubmit() {
  if (this.myForm.valid) {
    const formValue = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };
    console.log(`=-=-=-=form=-=-=-`, formValue);

    // Perform your login logic here

    this.service.post(formValue, "/api/v1/auth/admin-login").subscribe(
      (response) => {
        console.log(`login success`, response);
        this.myForm.reset();
        if (response.statusCode === 200) {
          // localStorage.setItem('token',response.data.token)
          // localStorage.setItem('user',JSON.stringify(response.data))
          // localStorage.setItem('user_id',response.data.user_id)
          // localStorage.setItem('user_type',response.data.user_type)
          console.log(response.txt);
          // this.userPhoneService.UserPhone = Phone
          // console.log("=-=-=-=phone=-=-=",this.userPhoneService.UserPhone)
          this.router.navigate(['/dashboard']);
          
        } else if (response.statusCode === 400) {
          console.log(response.message);
          this.snackbarService.showCustomSnackBarError(response.message)
          
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
