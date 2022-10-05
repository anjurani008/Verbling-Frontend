import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SharedService } from 'src/app/shared/shared.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { ReschedComponent } from 'src/app/teachers-listing/resched/resched.component';
import { TeachersService } from 'src/app/teachers-listing/teachers.service';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard.service';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { SlotmodalComponent } from '../slotmodal/slotmodal.component';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  value = 'Clear me';
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<SlotmodalComponent>;

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  eventsCalendar: CalendarEvent[] = [];
  modalData: any;
  viewMdal = false;


  selected: Date | null;
  slotDates: Date | null
  viewModal = false;
  user: any
  userid: any
  slotData = [];
  filters: { page: Number, count: Number, total: Number, userId: string, isBooked: string } = { page: 1, count: 5, total: 0, userId: '', isBooked: '' };



  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  // refresh: Subject<any> = new Subject();
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  scheduledData:any=[];
  appointmentDetail: any;
  description: any;
  rejectModal = false;
  addEditModal = false;
  isSubmitted = false;
  id: any;
  userData: any={};
  search:any='';
  pageSize: number = 10;
	totalRecords: number = 0;
  pageIndex: number = 0;
  favouriteSearch:any='';
  public _host = environment.url;
  favouriteList:any=[];
  scheduleStatus:any='';
  scheduleCount:any={};

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
    private teacherService: TeachersService,
    private sharedService: SharedService
  ) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('credentials'))
    this.userid = this.user.id
    if (this.userid) {
      this.getDetail();
      // this.getSlot(this.userid);
      this.getScheduledData();
      this.getFvaouriteTeachers();
      this.getAllScheduleCount();
    }


  }

  getAllScheduleCount(){
    this.dashboardService.getAllScheduleStudentCount().subscribe(res=>{
      if(res.success){
        this.scheduleCount = res.data;
        
      }else{

      }
    },
    error=>{
      
    }
    )
  }

  getFvaouriteTeachers(){
    this.spinner.show();
    this.teacherService.getFavourites(this.favouriteSearch).subscribe(res => {
      if (res.success) {
        console.log(res);
        this.favouriteList = res.data;
        // console.log(this.favouriteList)
        // this.snackBar.open(res.message, '', {
        //   duration: 2500,
        // });
        // this.getAllMembers();
      } else {
        this.snackBar.open(res.error.message, '', {
          duration: 2500,
        });
      }
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      }
    )
  }

  getDetail() {
    this.spinner.show();
    this.teacherService.getUser(this.userid).subscribe((res: any) => {
      // console.log(res);

      if (res.success) {
        this.userData = res.data;
        console.log(this.userData);

      } else {
        this.snackBar.open(res.error.message, '', {
          duration: 2500,
        });
      }
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      });
  }

  openDialog(item, event) {
    if (item == 'language') {
      const dialogRef = this.dialog.open(ModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else if (item == 'slot') {
      const dialogRef = this.dialog.open(SlotmodalComponent, {
        data: { event }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else if (item == 'lessons') {
      const dialogRef = this.dialog.open(LanguageModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else if (item == 'deck') {
      const dialogRef = this.dialog.open(LanguageModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      // this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.viewMdal = true;
  }




  getSlot(id) {

    this.dashboardService.get(`schedules?id=${id}&isBooked=false&isDeleted=false`).subscribe(res => {
      if (res.success) {

        this.slotData = res.data;
        console.log('this.slotData', this.slotData);
        let date = []
        var item = this.slotData.map(item => {

          let d = new Date(item.start);
          let d1 = d.setDate(d.getDate() - 1)

          let list = {
            start: new Date(d1),
            title: 'New event available',
            // color: colors.red,
            // actions: this.actions,
            allDay: false,
            
          }
          date.push(list)

        })
        this.events = date
      }
      // this.viewDate = item
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

  tabClick(tab) {
    if(tab.tab.textLabel=='Lessons'){
      this.changeFilter('accepted');
    }else{
      this.changeFilter('');
    }
  }

  changeFilter(value){ 
    this.scheduleStatus = value
    if(value==''){
      this.scheduleStatus='';
      
    }
    if(value=='booked'){
      this.scheduleStatus='booked';
     
    } 
     if(value=='rescheduled'){
      this.scheduleStatus='rescheduled';
     
    }
    if(value=='cancelled'){
      this.scheduleStatus='cancelled';
     
    }
    
    this.getScheduledData();

  }

  getScheduledData(){
    let data = {
			page: this.pageIndex + 1,
			count: this.pageSize,
      status: this.scheduleStatus,
		}	
		if(this.search!=''){
			data['search']=this.search
		}
    this.sharedService.getWithParams('book/schedules',data).subscribe(res => {
      if (res.success) {

        this.scheduledData = res.data;
         this.totalRecords = res.total;
        console.log('this.scheduledData', this.scheduledData);
        let date = []
        this.scheduledData.map(item => {
          if(item.status=='booked'){
            let d = new Date(item.startDate);
            let d1 = d.setDate(d.getDate() - 1)
  
            let list = {
              start: new Date(item.startDate),
              title: item.scheduleName,
              // color: colors.red,
              // actions: this.actions,
              allDay: false,
              
            }
            date.push(list)
          }
         

        })
        this.events = date
      }
      // this.viewDate = item
    })
  }

  getPaginatorBookings(event){
    this.pageIndex = event.pageIndex;
    this.getScheduledData()

}

clearValue() {
  this.pageIndex = 0;
  this.search = '';
  this.getScheduledData()
}

  viewAppointment(id) {
    this.id = id;
    let filter = {
      appointmentId: id
    }
    this.spinner.show()
    this.dashboardService.getAll('single/book/schedule', filter).subscribe((res: any) => {
      if (res.success) {
        if (res.data) {
          this.appointmentDetail = res.data[0];
        }

        console.log("his.appointmentDetail ",this.appointmentDetail )
        this.viewModal = true;
        this._bs.openModal()

      }
      else {
        this.events = [];
        this.filters.total = 0;
      }

      this.spinner.hide()

    }, error => {
      this.spinner.hide()
    });
  }

  close() {
    this.addEditModal = false;
    this.viewModal = false;
    this.rejectModal = false;
    this._bs.closeModal()
  }

  cancelSchedule(id){
    let obj = {
      appointmentId: id,
    }

    this.dashboardService.cancelSchedule(obj).subscribe((res: any) => {
      if (res.success) {
        this.snackBar.open('Cancelled Successfully!', '', {
          duration: 3000,
        });
        this.getScheduledData();

      } else {
        // this.toastr.error('Unable to delete at the moment, Please try again later', 'Error');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  reschedule(teacherData,appointmentId){
    const dialogRef =  this.dialog.open(ReschedComponent, {
     
      width: '50%',
      height:'550px',
      data: {
        teacherId: teacherData.teacherId._id,
        key:'paid',
        teacherData:teacherData,
        appointmentId:appointmentId
      },
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getScheduledData();
      // this.getSlot(this.userid);
    });
  }

}
