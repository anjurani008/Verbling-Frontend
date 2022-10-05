import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-slotmodal',
  templateUrl: './slotmodal.component.html',
  styleUrls: ['./slotmodal.component.scss']
})
export class SlotmodalComponent implements OnInit {
  @ViewChild("timepicker", { static: false }) timepicker: any;
  // @ViewChild("timepickers", { static: false }) timepickers: any;
 
  today = new Date();
  submitted: Boolean = false;
  slotForm: FormGroup;
  slotData:any
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 }
  constructor(
    // public dialogRef: MatDialogRef<SlotmodalComponent>,
    @Optional() public dialogRef: MatDialogRef<SlotmodalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  
    private _fb: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private spinner: SpinnerService,
    private snackBar: MatSnackBar,
    private _bs: BehaviorService,
    private dashboardService: DashboardService,
    


  ) { this.createForm();   
      console.log(data,'data'); 
      console.log(data.event.id);
      
      this.getSlot(data.event.id)
    }

  ngOnInit(): void {


    
  }

  createForm() {
    this.slotForm = this._fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
    });
  }

  get f() { return this.slotForm.controls; }

  onChangeHour(event) {
    console.log('event', event);
  }

  closeModel() {
    this.dialogRef.close();
  }
  getSlot(id) {
    if(id){
      this.dashboardService.get(`single/schedule?id=${id}`).subscribe(res => {
        if (res.success) {
  
          this.slotData = res.data;
          let selectedDate = this.slotData.start.split(' ');
          console.log(selectedDate);
          console.log(new Date(this.slotData.start));
          
            this.slotForm.patchValue({
              title: this.slotData.title,
              start: new Date(this.slotData.startDatetime),
              starttime:this.slotData.starttime,
              endtime:this.slotData.endtime
            })
  
        }
  
      })
    }
   
  }

  getIsoDate(date) {
    let d = new Date(date);
    let value = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    }
    return value
  }

  getDate() {
    let d = new Date();
    let date = this.slotForm.value.start;
    let time = this.slotForm.value.starttime;
    let hrs = time.split(":")[0];
    let mins = time.split(":")[1];
    
    console.log(date);
    
    let udate=this._bs.stringToDate(`${date.year}-${date.month}-${date.day}`)
    console.log(udate);
    
    this.slotForm.patchValue({ start: this._bs.getIso(udate)})
  }

  formatDate(date) {
		let month = date.getUTCMonth() + 1;
		let day =  date.getUTCDate();;
		let year = date.getUTCFullYear();
	
		// if (month.length < 2) month = '0' + month;
		// if (day.length < 2) day = '0' + day;
	
		return day/month/year
		
	  }

//   formatDate(date){
//     var d = new Date(date);
// d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
// console.log(d);

// return d;
//   }

  onSubmit() {
    this.submitted = true;
    // this.getDate();
    // console.log('this.slotForm',this.slotForm.value);
    
    if (!this.slotForm.invalid) {
      this.spinner.show();
      let data = this.slotForm.value;
      // data['start'] = this.formatDate(this.slotForm.value.start);
      console.log(data['start']);
      
      let date = new Date(data['start']);
        date.setDate(date.getDate());
      // let s = new Date(date).toISOString;
      console.log(date);
      
      data['start'] = date;
     
      if(this.data.event.id){
        data['id'] = this.data.event.id;
        console.log(data['start']);
        
        this.dashboardService.updateSlot(data, `schedule`).subscribe(res => {

          if (res.success) {
            this.snackBar.open(res.message, '', {
              duration: 2500,
            });
            this.submitted = false
            this.closeModel();
  
          } else {
            this.snackBar.open(res.message, '', {
              duration: 2500,
            });
            this.spinner.hide();
  
  
          }
         
          this.spinner.hide();
        },
          error => {
            this.snackBar.open(error, '', {
              duration: 2500,
            });
            this.spinner.hide();
          });
      }else{
        date.setDate(date.getDate()+1);
        data['start'] = date;
        this.dashboardService.add(data, `schedule`).subscribe(res => {

          if (res.success) {
            this.snackBar.open(res.message, '', {
              duration: 2500,
            });
            this.submitted = false
            this.closeModel();
  
          } else {
            this.snackBar.open(res.message, '', {
              duration: 2500,
            });
            this.spinner.hide();
  
  
          }
         
          this.spinner.hide();
        },
          error => {
            this.snackBar.open(error, '', {
              duration: 2500,
            });
            this.spinner.hide();
          });
      }
     
    }
  }







}
