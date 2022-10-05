import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { DashboardService } from '../dashboard.service';
import { EquipmentModalComponent } from '../equipment-modal/equipment-modal.component';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { SlotmodalComponent } from '../slotmodal/slotmodal.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  value = 'Clear me';
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<SlotmodalComponent>;

  selected: Date | null;
  slotDates:Date | null
  viewModal = false;
  user:any
  userid: any
  slotData = [];
  filters: { page: Number, count: Number, total: Number, userId: string, isBooked: string } = { page: 1, count: 5, total: 0, userId: '', isBooked: '' };

  constructor(
    public dialog: MatDialog,

    // public dialogRef: MatDialogRef<SlotmodalComponent>,
    private _fb: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private spinner: SpinnerService,
    private snackBar: MatSnackBar,
    private _bs: BehaviorService,
    private dashboardService: DashboardService,




  ) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('credentials'))
    this.userid = this.user.id
    if (this.userid) {
      this.getSlot(this.userid);
    }


  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(ModalComponent);

  openDialog(item, event) {
    if (item == 'language') {
      const dialogRef = this.dialog.open(ModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else if  (item == 'lessons'){
      const dialogRef = this.dialog.open(LanguageModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else if(item == 'deck'){
      const dialogRef = this.dialog.open(LanguageModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  openBox() {
  const dialogRef = this.dialog.open(EquipmentModalComponent);

}




  getSlot(id) {

    this.dashboardService.get(`schedules?id=${id}&isBooked=false&isDeleted=false`).subscribe(res => {
      if (res.success) {

        this.slotData = res.data;
      }

    })
  }

  // editEvent(data) {
  //   this.isEdit = true;
  //   this.submitted = false;
  //   this._bs.openModal()
  //   let date = this.getIsoDate(data.start);
  //   this.addSloteForm.patchValue({ id: data.id, title: data.title, start: date, scheduleType: data.scheduleType, starttime: data.starttime })
  // }


  remove(ID) {
    if (confirm("Do you want to delete this?")) {
      this.spinner.show();

      let obj = {
        id: ID,
        model: 'schedules'
      }

      this.dashboardService.deleteRecord(obj).subscribe((res: any) => {
        if (res.success) {
          // this.toastr.success('Deleted Successfully');
          this.getSlot(this.userid);

        } else {
          // this.toastr.error('Unable to delete at the moment, Please try again later', 'Error');
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent);

}  

  }



