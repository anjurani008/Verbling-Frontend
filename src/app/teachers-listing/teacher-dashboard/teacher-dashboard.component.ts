import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { EjsCalendarComponent } from '../ejs-calendar/ejs-calendar.component';
import { TeachersService } from '../teachers.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  user: any;
  youtubeVID: any;
  a: any;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  selected: Date | null;
  _subscriberData: any;
  public membersData: Array<any> = [];
  public response: any;
  addcls = false;
  totalItems = 0
  page = 1;
  filters: { page: number; count: number; search: string; role: string, isDeleted: Boolean, userId: string, subjects: any, speaks: any,age: any } = {
    page: 1,
    count: 1000,
    search: '',
    role: 'teacher',
    isDeleted: false,
    userId: '',
    subjects: '',
    speaks: '',
    age: '',
  };
  public _host = environment.url;
  genderFilter: any = [];
  subjectFilter: any = [];
  subjectData: any = [];
  speaksData: any = [];
  AgeData: any = ['0-3', '3-5', '6-12', '12-15', '15-18'];
  speaksFilter: any = [];
  AgeFilter: any = [];
  testPreparationData: any = [];
  testPreparationFilter: any = [];
  countryData: any = [];
  countryFilter: any = [];
  showCalendarModel = false
  userData: any = {};
  pageSize: number = 10;
  totalRecords: number = 0;
  pageIndex: number = 0;
  urlSafe: SafeResourceUrl;
  isLoading: boolean = false;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  /*-----availability filter--------*/
  filter: number = 1;
  hoveredDate: NgbDate | null = null;

  fromDate:any;
  toDate:any;
  checked:any=false
  constructor(
    private spinner: NgxSpinnerService,
    private _activateRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    private credentialService: CredentialsService,
    private router: Router,
    private memberService: TeachersService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    calendar: NgbCalendar
  ) {
      // this.fromDate = calendar.getToday();
      // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  ngOnInit() {
    this.filters.userId = this.credentialService.credentials ? this.credentialService.credentials.id : '';
    this.user = this.credentialService.credentials;
    // if (this._activateRouter.snapshot.params['page']) {
    console.log("usee",this.user)
    // this.filters.manager_id = this.credentialService.credentials.manager_id;
    // if (this._activateRouter.snapshot.params['page']) {

    //   this.filters.page = JSON.parse(this._activateRouter.snapshot.params['page']);
    //   this.page = this.filters.page;
    //   Object.assign(this.filters, { page: this.filters.page });
    //   this.getAllMembers();
    // } else {
    this.page = 1
    this.getAllMembers();

    this.getSubjects();
    this.getAllSpeaks();


    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
    };
    // this.  getFvaouriteList();
  }


  onWindowScroll(e, data) {
    // loadVideo= data.intoductoryLink
    console.log(e);
    console.log(data);
    if (data.intoductoryLink) {
      let rx =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      this.youtubeVID = data.intoductoryLink.match(rx);
      this.youtubeVID = this.youtubeVID[1];
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.youtube.com/embed/" + this.youtubeVID
      );
    }

  }

  onScroll(e) {
    console.log(e);

  }

  addClss() {
    this.addcls = !this.addcls;
  }
  getSubjects() {

    this.spinner.show();
    this.isLoading = true;
    this._subscriberData = this.memberService.getAllSubjects(this.filters).subscribe((response) => {
      if (response['data'].length == 0) {
        this.subjectData = [];
        this.isLoading = false;
        this.spinner.hide();
        this.totalItems = response.total;
      } else {
        this.totalItems = response.total
        this.subjectData = response['data'].map(res => {
          return {
            item_id: res._id,
            item_text: res.name,
            image: res.image

          }
        });
        console.log('this.subjectData', this.subjectData);

        this.isLoading = false;
        this.spinner.hide();
      }
    });
  }

  // getAllSubjects() {
  //   this.subjectData = [];
  //   this.spinner.show();
  //   this._subscriberData = this.memberService.getAllSubjects().subscribe((response) => {
  //     if (response.data.length == 0) {
  //       this.subjectData = [];
  //       this.totalItems = response.total;

  //       this.spinner.hide();
  //       this.snackBar.open(response.error.message, '', {
  //         duration: 2500,
  //       });
  //     } else {
  //       this.subjectData = response.data;
  //       this.spinner.hide();

  //     }
  //   },
  //     error => {
  //       this.spinner.hide();
  //       this.snackBar.open(error, '', {
  //         duration: 2500,
  //       });
  //     }
  //   );
  // }



  getAllSpeaks() {
    this.speaksData = [];
    this.spinner.show();
    this._subscriberData = this.memberService.getAllSpeaksData().subscribe((response) => {
      if (response.data.length == 0) {
        this.speaksData = [];
        this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.speaksData = response.data;
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

  getAllTestPreprationList() {
    this.testPreparationData = [];
    this.spinner.show();
    this._subscriberData = this.memberService.getAllTestPreprationData().subscribe((response) => {
      if (response.data.length == 0) {
        this.testPreparationData = [];
        this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.testPreparationData = response.data;
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

  getCountryList() {
    this.countryData = [];
    this.spinner.show();
    this._subscriberData = this.memberService.getCountryList().subscribe((response) => {
      if (response.data.length == 0) {
        this.countryData = [];
        this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.countryData = response.data;
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

  getPaginatorBookings(event) {
    this.pageIndex = event.pageIndex;
    this.getAllMembers()

  }

  getAllMembers() {
    this.membersData = [];
    this.spinner.show();
    // this.isLoading = true;
    // if (this.role) {
    //   Object.assign(this.filters, { role: this.role });
    // }
    let data = {
      page: this.pageIndex + 1,
      count: 1000,
      status: "active",
      search: this.filters.search,
      role: 'teacher',
      // gender: this.filters.gender,
      isDeleted: false,
      userId: this.filters.userId,
      subject: this.filters.subjects,
      speaks: this.filters.speaks,
      age: this.filters.age,
      // testPreparation: this.filters.testPreparation,
      // country: this.filters.country
    }
    // if(this.filters.search!=''){
    // 	data['search']=this.filters.search
    // }
    this._subscriberData = this.sharedService.getWithParams('users', data).subscribe(response => {
      // this._subscriberData = this.memberService.getAllUsers(this.filters).subscribe((response) => {
      if (response.data.length == 0) {
        this.membersData = [];
        this.totalItems = response.total;
        this.totalRecords = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.membersData = response.data;
        console.log('this.subjectData', this.membersData);

        this.totalItems = response.total;
        this.totalRecords = response.total;
        // this.isLoading = false;
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

  setPage(e) {
    this.page = e.offset + 1;
    Object.assign(this.filters, { page: this.page });
    // let route = '/companies/companies/' + this.page;
    // this.router.navigate([route]);
    this.getAllMembers();
  }

  searchValue() {
    this.page = 1;
    
    Object.assign(this.filters, { page: this.page, search: this.filters.search });
    this.getAllMembers();
  }

  clearValue() {
    // this.page = 0;
    this.filters.search = '';
    // Object.assign(this.filters, { page: this.page, search: this.filters.search });
    this.getAllMembers();
  }


  view(id, type) {
    // this.companiesService.actionType.next(type)
    let route = '/users/view/' + id + '/' + this.page + '/' + type;
    this.router.navigate([route]);
  }

  edit(ID) {
    // this.companiesService.actionType.next(type)
    // this.companiesService.activePage.next(this.page)
    let route = '/users/edit/' + ID + '/' + this.page;
    this.router.navigate([route]);
  }

  checkSubscription(teacher, key) {
    console.log(teacher);
    console.log(key);
    
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
          this.getDetail(teacher._id, key, teacher);
          console.log(this.userData.subscription_id);
        }

      }

    } else {
      this.snackBar.open('Please login to system for booking a lesson', '', {
        duration: 3000,
      });
    }



  }

  getDetail(teacherId, key, teacherData) {
    // this.spinner.show();
    this.memberService.getUser(this.user.id).subscribe((res: any) => {


      if (res.success) {
        console.log('redfdfdfds', res)
        this.userData = res.data;

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
          } 
          else
          if (key=='Individual') {
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
          }
          else {
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

  filterData(value) {
    // this.role = "";
    if (value === "" || value === "all") {
      delete this.filters['role'];
      this.getAllMembers();
    } else {
      // this.role = value
      Object.assign(this.filters, { role: value });
      // this.role = value;  
      this.getAllMembers();
    }

  }

  // changeFilter(event) {
  //   if (event.checked) {
  //     this.genderFilter.push(event.source.value)
  //   } else {
  //     const index = this.genderFilter.indexOf(event.source.value);
  //     if (index > -1) {
  //       this.genderFilter.splice(index, 1); // 2nd parameter means remove one item only
  //     }
  //   }
  //   if (this.genderFilter.length == 2) {
  //     this.filters.subjects = '';
  //   } else {
  //     this.filters.subjects = this.genderFilter;
  //   }

  //   this.getAllMembers();

  // }

  changeSubjectFilter(event) {
    if (event.checked) {
      this.subjectFilter.push(event.source.value)
    } else {
      const index = this.subjectFilter.indexOf(event.source.value);
      if (index > -1) {
        this.subjectFilter.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    if (this.subjectFilter.length == this.subjectData.length) {
      this.filters.subjects = '';
    } else {
      this.filters.subjects = this.subjectFilter;
    }

    this.getAllMembers();
  }

  // changeCountryFilter(event) {
  //   if (event.checked) {
  //     this.countryFilter.push(event.source.value)
  //   } else {
  //     const index = this.countryFilter.indexOf(event.source.value);
  //     if (index > -1) {
  //       this.countryFilter.splice(index, 1); // 2nd parameter means remove one item only
  //     }
  //   }
  //   if (this.countryFilter.length == this.countryData.length) {
  //     this.filters.country = '';
  //   } else {
  //     this.filters.country = this.countryFilter;
  //   }

  //   this.getAllMembers();
  // }

  changeSpeaksFilter(event) {
    if (event.checked) {
      this.speaksFilter.push(event.source.value)
    } else {
      const index = this.speaksFilter.indexOf(event.source.value);
      if (index > -1) {
        this.speaksFilter.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    // if (this.speaksFilter.length == this.speaksData.length) {
    //   this.filters.speaks = '';
    // } else
     
      this.filters.speaks = this.speaksFilter;
    

    this.getAllMembers();
  }
  changeAgeFilter(event) {
    if (event.checked) {
      this.AgeFilter.push(event.source.value)
    } else {
      const index = this.AgeFilter.indexOf(event.source.value);
      if (index > -1) {
        this.AgeFilter.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    // if (this.AgeFilter.length == this.AgeData.length) {
    //   this.filters.age = '';
    // } else {

      this.filters.age = this.AgeFilter;
    // }

    this.getAllMembers();
  }

  // changePreparationFilter(event) {
  //   if (event.checked) {
  //     this.testPreparationFilter.push(event.source.value)
  //   } else {
  //     const index = this.testPreparationFilter.indexOf(event.source.value);
  //     if (index > -1) {
  //       this.testPreparationFilter.splice(index, 1); // 2nd parameter means remove one item only
  //     }
  //   }
  //   if (this.testPreparationFilter.length == this.testPreparationData.length) {
  //     this.filters.testPreparation = '';
  //   } else {
  //     this.filters.testPreparation = this.testPreparationFilter;
  //   }

  //   this.getAllMembers();
  // }

  // getFavourites(event){
  //   console.log('event',event);

  //   if (event == true) {
  //     this.getFavouriteteacher();
  //   }else{
  //     this.getAllMembers();
  //   }
  // }
  getFavourites(){
    if(this.checked==true){
      
      this.getFavouriteteacher();
      console.log("true")
    }
    else{
      this.getAllMembers();
      console.log("false")
    }
    
  }
  getFavouriteteacher(){
    let params = {
     
      role:"teacher",
      userId:this.filters.userId 

    }
    this.spinner.show();
    this.memberService.getFavouriteteacher(params).subscribe(res => {
      if (res.success) {
        console.log(res);
        this.membersData= res.data;

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

  addFavourite(id) {
    let data = {
      'userId': id
    }
    this.memberService.addFavourite(data).subscribe(res => {
      if (res.success) {
        this.snackBar.open(res.message, '', {
          duration: 2500,
        });
        this.getAllMembers();
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

  /*------------availability----------------*/
  onDateSelection(date: NgbDate) {
    console.log("date",date)
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log("this.fromData",this.fromDate)
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      console.log("this.toDate",this.toDate)
    } else {
      this.toDate='';
      this.fromDate=date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }



  getAvailability(close:any=false) {
    if(close){
      document.getElementById("btnDropdownDemoavail")?.click()
    }
    if(!this.toDate){
      this.toDate = this.fromDate;
    }
    this.spinner.show();
    let filter = {
      filter: this.filter,
      fromDate: this.changeDate(this.fromDate),
      toDate: this.changeDate(this.toDate,true),
      role:"teacher",
      userId:this.filters.userId, 
      status:"active"

    }
    this.memberService.getAvailability(filter).subscribe(res => {
      if (res.success) {
        console.log(res);
        this.membersData = res.data;

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
  

changeDate(date:any,time=false) {
  let value:any="";
  if(date){
    value=new Date(`${date.year}-${date.month}-${date.day}`)

    if(time){
      value.setHours(23)
      value.setMinutes(59)
    }

  }
  return value
}

  ngOnDestroy(): void {

    if (this._subscriberData) {

    }
  }

}
