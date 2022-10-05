import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { AuthService } from '../../auth/auth.service';
import { CredentialsService } from '../../auth/credentials.service'; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePassForm: FormGroup;
  submitted = false;
  oldPassTextType: boolean;
  newPassTextType: boolean;
  cnfmPassTextType: boolean;
  _changePassSubscription: any;
  user: any={};

  constructor(
    // private toastr: ToastrService,
    // private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router,
    private spinner: SpinnerService,
    private snackBar: MatSnackBar,
    private _bs:BehaviorService
  ) { this.createForm(); }

  createForm() {
    this.changePassForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', [Validators.required,]]
    },
      {
        validator: ConfirmMatch('newPassword', 'confirmPassword')
      }
    );
  }

  get f() { return this.changePassForm.controls; }

  ngOnInit(): void {
    this.user = this.credentialsService.credentials;
  }

  toggleOldPassword() {
    this.oldPassTextType = !this.oldPassTextType;
  }

  toggleNewPassword() {
    this.newPassTextType = !this.newPassTextType;
  }

  toggleCnfmPassword() {
    this.cnfmPassTextType = !this.cnfmPassTextType;
  }

  onSubmit() {
    this.submitted = true;
  this.spinner.show()
    if (!this.changePassForm.invalid) {
      
      this._changePassSubscription = this.authService.changePass(this.changePassForm.value).subscribe(res => {
        if (res.success) {
          this.submitted = false;
        
          this.logout();
          this.spinner.hide()

        } else {

          this.snackBar.open(res.code.message, '', {
            duration: 2500,
          });
          this.spinner.hide()

          
        }
      },
        error => {
          this.snackBar.open(error, '', {
            duration: 2500,
          });
        }
      )
    }

  }

  logout() {
    this.credentialsService.logout().subscribe(res => {
      
      localStorage.removeItem("token");
      localStorage.removeItem("credentials");
      // this.toastr.success("Logout Successfully");
      this._bs.setUserData('')
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    if (this._changePassSubscription) {
      this._changePassSubscription.unsubscribe();
    }
  }

}
