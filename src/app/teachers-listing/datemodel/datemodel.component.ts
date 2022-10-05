import { Component, OnInit,Inject, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-datemodel',
  templateUrl: './datemodel.component.html',
  styleUrls: ['./datemodel.component.scss']
})
export class DatemodelComponent implements OnInit {
  
  public _host = environment.url;
  user: any;

  constructor(
    @Optional() public dialogRef: MatDialogRef<DatemodelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private credentials: CredentialsService,
    private teacherService: TeachersService,
    private snackBar: MatSnackBar,
    private _bs: BehaviorService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.user = this.credentials.credentials;
  }

  scheduleBooking(){
    let data={
      studentId: this.user.id,
      schedulesId: this.data.data.scheduleId,
      teacherId: this.data.data.teacherDetails.teacherId,
      planType: this.data.key
    }
    this.teacherService.bookSchedule(data).subscribe(res=>{
      if(res.success){
        this.snackBar.open(res.message, '', {
          duration: 3000,
        });
        this.dialogRef.close();
        // this._bs.closeModal()
      }else{
        this.snackBar.open(res.error.message, '', {
          duration: 3000,
        });
      }
    },error=>{
      this.snackBar.open(error, '', {
        duration: 3000,
      });
    })
  }
 

}
