import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  public loginForm: FormGroup;
  submitted = false;
  _loginObservable: any;
  passwordType: boolean=false;
  durationInSeconds = 3;
  role:any

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _bs:BehaviorService,
    private spinner: NgxSpinnerService
  ) {
    this.createForm(); 

    if(localStorage.getItem('credentials')){
      // this.router.navigateByUrl('/home')
    }else{
      this.router.navigateByUrl('/auth/login')

    }
   }

   createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$")]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    if(this.loginForm.controls.email.hasError('email')){
      return 'Not a valid email';
    }
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    // return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit(){
    this.submitted=true;
    if(!this.loginForm.invalid){
      this.loginForm.value.email = this.loginForm.value.email.toLowerCase()

      this.spinner.show();
      this._loginObservable = this.authService.login(this.loginForm.value).subscribe((res:any) => {
        if (res.success) {
          this.role=res.data.role
          this.submitted=false
          this.loginForm.reset();
          if(this.role=='teacher'){
            this.router.navigate(["/dashboard/teacher"]);
          }
          else{
            this.router.navigate(["/teachers/list"]);
          }
         
        } else {
          this.snackBar.open(res.error.message);
        
        }
        // if (this.rememberMe == true) {
        //   localStorage.setItem(
        //     'remember',
        //     this.loginForm.value.email,
        //   );
        //   localStorage.setItem(
        //     'rememberPassword',
        //     this.loginForm.value.password,
        //   );
        // } else {
        //   localStorage.removeItem('remember');
        //   localStorage.removeItem('rememberPassword');
        // }
        // if (this.rememberMe == true) {
        //   localStorage.setItem("remember", this.adminLoginForm.value.email);
        // } else {
        //   localStorage.removeItem('remember');
        // }

        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.snackBar.open(error, '', {
            duration:2500,
            
          });
          
        }
      );
    }
  }

  // openSnackBar() {
  //   this._snackBar.openFromComponent(LoginComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  ngOnDestroy(): void {
    if(this._loginObservable){
      this._loginObservable.unsubscribe();
    }
    if(this.snackBar){
      this.snackBar.dismiss();
    }
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    
  }


}
