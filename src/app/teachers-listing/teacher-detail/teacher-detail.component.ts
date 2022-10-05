import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { TeachersService } from '../teachers.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { ItemModel } from '@syncfusion/ej2-navigations';

import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  ScheduleComponent,
  ActionEventArgs,
  TimeScaleModel,
  EJ2Instance,
  ToolbarActionArgs,
  PopupOpenEventArgs
} from "@syncfusion/ej2-angular-schedule";
import { Button } from '@syncfusion/ej2-buttons';
import { extend } from '@syncfusion/ej2-base';
import { scheduleData } from './dataSource';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatemodelComponent } from '../datemodel/datemodel.component';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EjsCalendarComponent } from '../ejs-calendar/ejs-calendar.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss',],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService
  ]

})
export class TeacherDetailComponent implements OnInit {
  [x: string]: any;
  encapsulation: ViewEncapsulation.None
  @ViewChild('content') content: TemplateRef<any>; // Note: TemplateRef
  @ViewChild('closebutton', { static: false }) closebutton;
  @ViewChild("schedule", { static: true })
  public scheduleObj: ScheduleComponent
  public timeScale: TimeScaleModel = { enable: true, interval: 15, slotCount: 6 };
  data: Object[] = []
  public selectedDate: Date = new Date();
  public rowAutoHeight = true;
  public dataSource: Object[] = this.data
  // dataSource: Object[]= [

  //   // Id: 1,
  //   // Subject: "Testing Event",
  //   // StartTime: new Date(202, 9, 30, 14, 0),
  //   // EndTime: new Date(2021, 9, 30, 14, 50),
  //   // RecurrenceRule: "FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;",
  //   // RecurrenceException: "20211206T130000Z"

  // ]


  public eventSettings: EventSettingsModel = {
    dataSource: this.dataSource,
    enableTooltip: false,
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  };

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  eventsCalendar: CalendarEvent[] = [];
  userID: any;
  userData: any = {};
  public _host = environment.url;
  currentDate: any
  newDate: any



  modalData: {
    action: string;
    event: CalendarEvent;
  };

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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  slotData: []
  private _subscriberData: any;
  planData: any = [];
  urlSafe: SafeResourceUrl;

  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private teacherService: TeachersService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private dialog: MatDialog,
    public credentials: CredentialsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    
    this.user = this.credentials.credentials;
    console.log((this.user));
    
    this._activateRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.userID = params['id'];
        this.getDetail();
        if (this.user) {

          this.getAllPlans();
          // this.getSlot(this.userID)
        }

      }

    })
    // console.log(this.dataSource);




  }

  checkSubscription(teacher, key) {
    console.log(teacher);
console.log(this.user);

    if (this.user) {
      if (this.user.role == 'teacher') {
        this.snackBar.open('Sorry You cannot book a lesson as you are teacher!', '', {
          duration: 3000,
        });
      } else {
        if (!teacher.istrail && key == 'Free consultation') {
          this.snackBar.open('Sorry You already booked a free trial lesson!', '', {
            duration: 3000,
          });
        } else {
          this.getDetailTeacher(teacher.id, key, teacher);
          // console.log(this.userData.subscription_id);
        }

      }

      // this.getDetailTeacher(teacher.id, key, teacher);
      // console.log(this.userData.subscription_id);
    } 
    else {
      this.snackBar.open('Please login to system for booking a lesson', '', {
        duration: 3000,
      });
    }



  }





  getDetailTeacher(teacherId, key, teacherData) {
    console.log(key);
    
    // this.spinner.show();
 
    this.teacherService.getUser(this.user.id).subscribe((res: any) => {
      console.log('teacher', res);

      if (res.success) {
        this.userData = res.data;
        console.log('userData', this.userData);

        if (key == 'Free consultation') {
          const dialogRef = this.dialog.open(EjsCalendarComponent, {

            width: '50%',
            height: '550px',
            data: {
              teacherId: teacherId,
              key: key,
              teacherData: teacherData
            },

          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);

          });
          this.showCalendarModel = true;
        }
        else
          if (this.userData.subscription_id != '' && this.userData.subscription_id != undefined && key=='Lessons') {
            this.dialog.open(EjsCalendarComponent, {

              width: '50%',
              data: {
                teacherId: teacherId,
                key: key,
                teacherData: teacherData
              },
            });
            this.showCalendarModel = true;
          }else if (key=='Individual') {
            console.log('called..',teacherId);
            console.log(teacherData);
            
            
            const dialogRef = this.dialog.open(EjsCalendarComponent, {

              width: '50%',
              height: '550px',
              data: {
                teacherId: teacherId,
                key: key,
                teacherData: teacherData
              },

            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              // this.getScheduledData();
              // this.getSlot(this.userid);
            });
            this.showCalendarModel = true;
          } else {
            this.router.navigate(['/teachers/checkout'], { queryParams: { planType: key } })

          }
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

  openDialog(data) {
    console.log(data);

    this.dialog.open(DatemodelComponent, {

      width: '25%',
      data: {
        data: data,
        key: this.Teacherdata.key
      },
    });
  }
  // onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void { 
  //   if (args.requestType === 'toolbarItemRendering') { 
  //     let userIconItem: ItemModel = { template: '<input type="text" tabindex="1" id="dropdown" />', type: 'Input' } 
  //     args.items.push(userIconItem); 
  //   } 
  // } 


  onPopupOpen(args: PopupOpenEventArgs) {
    // console.log(args);

    // // console.log("popUp args", args.data.StartTime);
    // console.log("getEvent result", this.scheduleObj.getEvents(args.data));

    // let buttonElement = args.type === "QuickInfo" ? ".e-event-popup .e-edit" : ".e-schedule-dialog .e-event-edit";
    // let editButton = document.querySelector(buttonElement);
    // if (editButton && (editButton as EJ2Instance).ej2_instances) {
    //   ((editButton as EJ2Instance).ej2_instances[0] as Button).disabled = false;
    //   args.cancel = true;

    // }
    // let isEmptyCell =
    //   args.target.classList.contains('e-work-cells') ||
    //   args.target.classList.contains('e-header-cells');  // checking whether the cell is empty or not 
    if (args.type === 'QuickInfo' || args.type === 'Editor') {
      args.cancel = true;

    }
    if (this.user.role == 'student') {
      this.openDialog(args.data)
    } else {
      this.snackBar.open('You cannot book your own schedule', '', {
        duration: 3000,
      });
    }

  }



  onActionComplete(args: ActionEventArgs): void {
    // console.log(args.items, "args");
    // console.log(args.data, "args");
    // console.log("actionComplete", args.requestType,);
    switch (args.requestType) {
      case "viewNavigate":
      case "dateNavigate":
        // this.scheduleObj.refresh();
        break;
      case "toolBarItemRendered":
        break;
      default:
    }
  }


  getSlot(id) {

    this.teacherService.getSlot(`schedules?id=${id}&isBooked=false&isDeleted=false`).subscribe(res => {
      if (res.data.length == 0) {
        this.slotData = []
        this.spinner.hide()
        this.dataSource = []
      } else {
        this.eventsCalendar = res.data.map((element) => {
          let status = element.status

          if (element['bookedBy']) {
            if (element['status']) {

            } else {

              status = 'pending';
            }

          }
          this.slotData = res.data.map((data, i) => {
            // console.log(data);

            if (this.userID == data.teacherId) {
              let d = data.start.split('-');
              console.log(d);

              var year = d[0];
              var month = d[1]
              d = d[2].split(' ')
              var day = d[0]
              d = d[1].split(':')
              var hour = d[0]
              var min = d[1]
              // let d1 = d.setMonth(d.getMonth())
              let value = {
                Id: i + 1,
                // ids: data,
                teacherDetails: data,
                Subject: data.title,
                StartTime: new Date(year, month - 1, day, hour, min),
                EndTime: new Date(year, month - 1, day, hour, min),
                // Location: 'india',
                scheduleId: data.id
              }
              // let d = new Date(data.start);
              // let d1 = d.setMonth(d.getMonth())

              // let value = {
              //   Id: i + 1,
              //   teacherDetails: data,
              //   // Subject: data.title,
              //   StartTime: new Date(d1),
              //   EndTime: new Date(d1),
              //   startTime:data.starttime,
              //   scheduleId: data.id
              // }
              this.data.push(value);
              this.dataSource.push(value);
              // console.log(value);
            }

          });
        });
        if (this.eventsCalendar.length > 0) {
          this.eventSettings.dataSource = this.dataSource;
          console.log("this.eventSettings", this.eventSettings)
          this.scheduleObj.refresh();
        }
        // // if (this.eventsCalendar.length > 0) {
        //   this.eventSettings.dataSource = this.dataSource;
        //   // this.viewDate = this.eventsCalendar[0].start;
        //   console.log("this.eventSettings",this.eventSettings)
        //   this.scheduleObj.refresh();
        //   // this.loadData()
        // // }
        // console.log(this.dataSource);
        // console.log(this.data);
        this.spinner.hide()
      }

    })
  }

  loadData() {
    document.getElementById("monthClickid").click();
  }


  getAllPlans() {
    this.spinner.show();
    let data = {
      'isDeleted': false
    }
    this._subscriberData = this.teacherService.getAllPlans(data).subscribe((response) => {
      if (response.data.length == 0) {
        this.planData = [];
        // this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.planData = response.data;
        this.spinner.hide();

      }
    },
      error => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      }
    );
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
      this.viewDate = date;
      this.currentDate = date;

      let value = date
      value.setDate(value.getDate() + 1)
      this.newDate = new Date(value).toISOString()

      // this.getApponiment();

    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  // getApponiment() {
  //   let data = {
  //     doctorId: this.user.id,
  //     date: this.newDate,
  //   }
  //   this.isLoading = true;
  //   this.spinner.show()
  //   this.dashboardService.getAllAppointment(data).subscribe((response) => {
  //     if (response.data.length == 0) {
  //       this.appointmentData = []

  //       this.spinner.hide()

  //       this.isLoading = false;
  //     } else {
  //       this.appointmentData = response.data.map(data => {
  //         let name = data.doctordetails.fullName
  //         this.Data = name
  //         return {
  //           id: data.appointmentId,
  //           time: data.starttime,
  //           patientname: data.patientName,
  //           type: data.appointmentId.patientType,
  //           reason: data.appointmentId.visitType,
  //           age: data.patientAge,
  //           gender: data.patientGender,
  //           edit: data.appointmentId.description,
  //           status: data.status,
  //         }
  //       });
  //       this.isLoading = false;
  //       this.total = response.total

  //       this.spinner.hide()
  //     }
  //   });
  // }
  getDetail() {
    this.spinner.show();
    console.log(this.user);

    this.teacherService.getUser(this.userID, this.credentials.credentials?.id).subscribe((res: any) => {
      console.log("res", res);

      if (res.success) {
        this.userData = res.data;

      this.spinner.hide();

        console.log("fdfsdfdf", this.userData);
        if (this.userData.intoductoryLink) {
          let rx =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
          this.youtubeVID = this.userData["intoductoryLink"].match(rx);
          this.youtubeVID = this.youtubeVID[1];
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            "https://www.youtube.com/embed/" + this.youtubeVID
          );
        }
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

  addFavourite(id) {
    let data = {
      'userId': id
    }
    this.teacherService.addFavourite(data).subscribe(res => {
      if (res.success) {
        this.snackBar.open(res.message, '', {
          duration: 2500,
        });
        this.getDetail();
        this.getSlot(this.userID)
      } else {
        this.snackBar.open(res.error.message, '', {
          duration: 2500,
        });
      }
    },
      error => {
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      }
    )
  }

  bookSchedule(scheduleData) {
    let data = {
      studentId: scheduleData.user.id,
      schedulesId: scheduleData.id,
      teacherId: this.userData.id
    }
    this.teacherService.bookSchedule(data).subscribe(res => {
      if (res.success) {
        this.snackBar.open(res.message, '', {
          duration: 3000,
        });
      } else {
        this.snackBar.open(res.error.message, '', {
          duration: 3000,
        });
      }
    }, error => {
      this.snackBar.open(error, '', {
        duration: 3000,
      });
    })
  }

  // open(data) {
  //   console.log(data);

  //   this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

}
