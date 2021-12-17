import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  login(){

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;


    if(username==localStorage.getItem('email') && password==localStorage.getItem('password')){
      this.router.navigate(['/home']);
    }
    else if(username==localStorage.getItem('email') && password!=localStorage.getItem('password')){
      this._snackBar.open("Invalid username or password!",'x',{
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'start',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
    else{
      this._snackBar.open("Invalid User. Please register to login",'x',{
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'start',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigate(['/register']);
    }
  }

}
