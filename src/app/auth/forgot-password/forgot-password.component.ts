import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotForm: FormGroup;
  submitted = false;
  _forgotObservable: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService,
  ) { this.createForm();  }
  
  createForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$")]],
      
    });
  }

  get f() { return this.forgotForm.controls; }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted=true
    if(!this.forgotForm.invalid){
      this.forgotForm.value.email = this.forgotForm.value.email.toLowerCase()
      
      this.spinnerService.show();
      this._forgotObservable = this.authService.sendEmail(this.forgotForm.value).subscribe(res => {
        if (res.success) {
          this.submitted=false;
          this.forgotForm.reset();
          this.router.navigate(['/auth/reset-password']);
          this.snackBar.open(res.message,'',{
            duration:2500
          }
          );
          this.spinnerService.hide();

        } else {
          this.snackBar.open(res.error.message,'',{
            duration:2500,
          });
        }
      },
        error => {
          this.snackBar.open(error, '',{
            duration:2500,
          });
          this.spinnerService.hide();

        }

      );
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this._forgotObservable){
      this._forgotObservable.unsubscribe();
    }
  }


}
