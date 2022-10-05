import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<OtpVerificationComponent>;
  public signupForm: FormGroup;
  submitted = false;
  _signupObservable: any;
  closeResult = ''
  mobileNumber: any;
  mobile: any
  userId: any
  // separateDialCode = false;
  // SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  // CountryISO = CountryISO;
  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates];


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private modal: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService,
    // public dialog: MatDialog,

  ) { this.createForm(); }

  createForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$")]],
      role: ['student'],
      // mobileNo: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
      password: ['', Validators.required,Validators.min(8)],
      acceptTerms: [false, Validators.requiredTrue]
     
    });
  }



  get f() { return this.signupForm.controls; }

  ngOnInit() {

    // this.signupForm.patchValue({
    //   number: "+97431422391",
    //   internationalNumber: "+974 3142 2391",
    //   nationalNumber: "3142 2391",
    //   countryCode: "QA",
    //   dialCode: "+974"
    // });
    // this.formChanges();
  }

  // formChanges() {
  //   this.signupForm.get('role').valueChanges
  //   .subscribe(value => {
  //     if (value == "photographer") {
  //       this.signupForm.get('ssn').setValidators([Validators.required]);
  //     }else{
  //       this.signupForm.get('ssn').clearValidators();
  //     }
  //     this.signupForm.get('ssn').updateValueAndValidity();
  //   });
  // }

  // roleChange(value) {
  //   if (value == "photographer") {
  //     this.signupForm.get('ssn').setValidators([Validators.required]);
  //   }else{
  //     this.signupForm.get('ssn').clearValidators();
  //   }
  //   this.signupForm.get('ssn').updateValueAndValidity();
  // }

  // changePreferredCountries() {
  //   this.preferredCountries = [CountryISO.UnitedStates];
  // }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(OtpVerificationComponent, {
  //     disableClose: true,
  //     width: '400px',
  //     data: { mobileNumber: this.mobileNumber, id: this.userId },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }





  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  OnSubmit() {
    this.submitted = true
    this.signupForm.value.email = this.signupForm.value.email.toLowerCase()
    // this.mobile = this.signupForm.get('mobileNo').value.e164Number

    // let data = {

    //   firstName: this.signupForm.value.firstName,
    //   lastName: this.signupForm.value.lastName,
    //   email: this.signupForm.value.email,
    //   // mobileNo: this.mobile,
    //   role: this.signupForm.value.role,
    //   password: this.signupForm.value.password,
     
    // }

    if (!this.signupForm.invalid) {
      this._signupObservable = this.authService.Signup(this.signupForm.value).subscribe(res => {
        if (res.success) {
          // this.mobileNumber = res.data.mobileNo
          // this.userId = res.data.id

          // localStorage.setItem('mobileNo', this.mobileNumber);
          // this.router.navigate(['/auth/otp']);

          // this.openDialog();
          this.router.navigate(['/auth/login']);
          this.snackBar.open('Email registered successfully.Please verify your email', '', {
            duration: 3000,
          });
          // this.snackBar.open('Email registered successfully.Please verify your email.',{});
        } else {
          this.snackBar.open(res.error.message, '', {
            duration: 2500,
          });
        }
        this.submitted = false
      },
        error => {
          this.snackBar.open(error, '', {
            duration: 2500,
          });
          this.submitted = false
        }
      );
    }
  }

  // otpVarification() {
  //   if (!this.signupForm.invalid) {
  //     this._signupObservable = this.authService.Signup(this.signupForm.value).subscribe(res => {
  //       if (res.success) {
  //         this.router.navigate(['/auth/login']);
  //         // this.snackBar.open('Email registered successfully.Please verify your email.');
  //       } else {
  //         this.snackBar.open(res.error.message, '', {
  //           duration: 2500,
  //         });
  //       }
  //       this.submitted = false
  //     },
  //       error => {
  //         this.snackBar.open(error, '', {
  //           duration: 2500,
  //         });
  //         this.submitted = false
  //       }
  //     );
  //   }

  // }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this._signupObservable) {
      this._signupObservable.unsubscribe();
    }
  }

}
