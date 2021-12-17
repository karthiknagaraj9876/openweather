import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import * as moment from 'moment';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  matcher = new MyErrorStateMatcher();

  constructor(private _snackBar: MatSnackBar,private router: Router) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 150, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }

  password_pattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~@#$^%])[a-zA-Z0-9~@#$^%]*";

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(this.password_pattern)]),
    address: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(100)])
  });

  register(){

    //Local storage
    localStorage.setItem('email', this.registerForm.value.email);
    localStorage.setItem('password', this.registerForm.value.password);
    // localStorage.setItem('last_registered_user', JSON.parse(this.registerForm.value));

    //Snack bar
    let snack_bar_ref = this._snackBar.open("You have been successfully registerd. Please login with the created credentials",'x',{
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'start',
      panelClass: ['mat-toolbar', 'mat-primary']
    });

    snack_bar_ref.afterDismissed().subscribe(() => {
      this.router.navigate(['login']);
      //console.log('The snackbar was dismissed');
    });

    // snack_bar_ref.dismiss();
  }

  get password(){
    return this.registerForm.get('password');
  }


}
