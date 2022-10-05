import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from 'src/app/auth/credentials.service';
@Component({
  selector: 'app-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.scss']
})
export class TeachComponent implements OnInit {
  panelOpenState = false;
  public teachForm: FormGroup;
  public userID: any;
  public data: any = {};
  submitted = false;
  closeResult = '';
  _teachSubscription:any;
  page = 1;
  id:any;
  filters: { page: number; count: number; search: string; } = {
    page: 1,
    count: 10,
    search: '',
  };
  modelRef: any;
  constructor(
    private formBuilder: FormBuilder,   private credentialService: CredentialsService,    private _activateRouter: ActivatedRoute, private snackBar: MatSnackBar, private spinner: NgxSpinnerService,private modalService: NgbModal, private SharedService:SharedService) {this.createForm(); }
    get f() { return this.teachForm.controls; }
  ngOnInit(): void {
    // if (this._activateRouter.snapshot.params['page']) {

    //   this.filters.page = JSON.parse(this._activateRouter.snapshot.params['page']);
    //   this.page = this.filters.page;
    //   Object.assign(this.filters, { page: this.filters.page });
 
    //   // this.getAllSubCategories();
    // } else {
    // this.filters = this.credentialService.credentials ? this.credentialService.credentials.id : ''

    // this.userID = this.credentialService.credentials.id;
    // this.data = JSON.parse(localStorage.getItem('user'));
    // }
  }
  createForm() {
    this.teachForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$")]],
      number: ['', Validators.required],
     
    });
  }

  open(content) {
  this.modelRef =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  this.modelRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.submitted = true;
  this.spinner.show()
    if (!this.teachForm.invalid) { 
      this._teachSubscription = this.SharedService.updateUser(this.data,this.data.id).subscribe(res => {
 
        if (res.success) {  
          this.modelRef.close();
            // this.closeResult = `Dismissed ${this.getDismissReason('')}`;
          
            this.snackBar.open('Applied for teacher successfully!', '', {
              duration: 3000,
            });
          
    
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
}
