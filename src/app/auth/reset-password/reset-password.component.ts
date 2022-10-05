import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPassForm: FormGroup;
  submitted = false;
  newPassTextType: boolean;
  cnfmPassTextType: boolean;
  authObservable: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { this.createForm(); }

  createForm() {
    
    this.resetPassForm = this.formBuilder.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: ConfirmMatch('newPassword', 'confirmPassword')
      }
    );
    
  }

  get f() { return this.resetPassForm.controls; }

  ngOnInit(): void {
  }

  toggleNewPassword() {
    this.newPassTextType = !this.newPassTextType;
  }

  toggleCnfmPassword() {
    this.cnfmPassTextType = !this.cnfmPassTextType;
  }

  onSubmit() {
    
    this.submitted = true;

    if (!this.resetPassForm.invalid) {

      this.spinner.show();
     this.authObservable = this.authService.resetPassword(this.resetPassForm.value).subscribe(res => {
        if (res.success) {
           this.snackBar.open(res.message, '', {
            duration:2500,
            
          });
          this.resetPassForm.reset();
          this.submitted = false;
          this.router.navigate(['/auth/login']);
        } else {
          this.snackBar.open(res.message, '', {
            duration:2500,
            
          });
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.snackBar.open(error, '', {
            duration:2500,
            
          });
        }
      )
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.authObservable){
      this.authObservable.unsubscribe();
    }
  }


}
