import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatemodelComponent } from '../datemodel/datemodel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeachersService } from '../teachers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-ejs-calendar',
  templateUrl: './ejs-calendar.component.html',
  styleUrls: ['./ejs-calendar.component.scss'],
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
export class EjsCalendarComponent implements OnInit {

  [x: string]: any;
  encapsulation: ViewEncapsulation.None
  @ViewChild('content') content : TemplateRef<any>; // Note: TemplateRef
  @ViewChild('closebutton', { static: false }) closebutton;
  @ViewChild("schedule", { static: true })
  public scheduleObj: ScheduleComponent
  public timeScale: TimeScaleModel = { enable: true, interval: 15, slotCount: 6 };
  data:Object[] = []
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

  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private teacherService: TeachersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<EjsCalendarComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public Teacherdata: any,
    @Optional() @Inject(MAT_DIALOG_DATA) public key: any,

  ) { }

  ngOnInit(): void {
    console.log(this.Teacherdata);
    console.log('this.key',this.key);
    
    // this.getDetail();
    this.getSlot()
  }

  getDetail() {
    this.spinner.show();
    this.teacherService.getUser(this.Teacherdata.teacherId).subscribe((res: any) => {
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

  onPopupOpen(args:PopupOpenEventArgs) {
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
    // if ((args.type === 'QuickInfo' || args.type === 'Editor') && isEmptyCell) {
    //   args.cancel = true;

    // }
    if (args.type === 'QuickInfo' || args.type === 'Editor') {
      args.cancel = true;

    }
    this.openDialog(args.data)
  }



  onActionComplete(args: ActionEventArgs): void {
    // console.log(args.items, "args");
    // console.log(args.data, "args");
    // console.log("actionComplete", args.requestType,);
    switch (args.requestType) {
      case "viewNavigate":
      case "dateNavigate":
        this.scheduleObj.refresh();
        break;
      case "toolBarItemRendered":
        break;
      default:
    }
  }


  getSlot() {

    this.teacherService.getSlot(`schedules?teacherId=${this.Teacherdata.teacherId}&notAssigned=true&isDeleted=false&title=${this.key.key}`).subscribe(res => {
      if (res.data.length == 0) {
        this.slotData = []
        this.spinner.hide()
        this.dataSource = []
      } else {
        this.slotData = res.data.map((data, i) => {
          console.log(data);
          
          if(this.Teacherdata.teacherId == data.teacherId){
            let d = new Date(data.start);
            // let d = data.start.split('-');
            // console.log(d);
            //   let time = data.starttime.split(':')
            // var year = d[0];
            // var month = d[1]
            // d = d[2].split(' ')
            // var day = d[0]
            // d = d[1].split(':')
            // console.log(d[0],d[1]);
            
            // var hour = d[0]
            // var min = d[1]
            let d1 = d.setMonth(d.getMonth())
            console.log(d1);
            
            let value = {
              Id: i + 1,
              // ids: data,
              teacherDetails: data,
              Subject: data.title,
              StartTime: new Date(d1),
              EndTime: new Date(d1),
              // StartTime: new Date(year, month - 1, day, hour, min),
              // EndTime: new Date(year, month - 1, day, hour, min),
              // Location: 'india',
              scheduleId: data.id
            }
            // let value = {
            //   Id: i + 1,
            //   teacherDetails: data,
            //   // Subject: data.title,
            //   StartTime: new Date(d1),
            //   EndTime: new Date(d1),
            //   startTime:data.starttime,
            //   scheduleId: data.id
            // }
            this.data.push(value)
            this.dataSource.push(value)
            // console.log(value);
          }
         
          
        });
        console.log(this.eventsCalendar);
        
        // if (this.eventsCalendar.length > 0) {
          this.eventSettings.dataSource = this.dataSource;
          // this.viewDate = this.eventsCalendar[0].start;
          console.log("this.eventSettings",this.eventSettings)
          this.scheduleObj.refresh();
            // this.loadData()
        // }
        console.log(this.dataSource);
        console.log(this.data);
        this.spinner.hide()
      }

    })
  }

  openDialog(data) {
    console.log(data);
    if(this.Teacherdata.key=='Individual'){
      this.dialogRef.close();
      this.router.navigate(['/teachers/checkout'], { queryParams: { planType: 'Individual',teacherid:this.Teacherdata.teacherId } })
    }else{
      const dialogRef = this.dialog.open(DatemodelComponent, {
 
        width: '25%',
        data: {
          data: data,
          key:this.Teacherdata.key
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.dialogRef.close();
      });
    }
    
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

  loadData() {
    document.getElementById("monthClickid").click();
  }
}
