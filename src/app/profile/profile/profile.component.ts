import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile.service';
import { find, get, pull } from 'lodash';
export interface PeriodicElement {
  name: string;
  position: string;
  country: string;
  symbol: string;
  unblock:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'shubham', name: 'Hydrogen', 	country: 'India', symbol: '2H',unblock:'no'},
  {position: 'shubham', name: 'Helium', 	country: 'India', symbol: '2h',unblock:'no'},
  {position: 'shubham', name: 'Lithium', 	country: 'India', symbol: '2h',unblock:'no'},
  {position: 'shubham', name: 'Beryllium', 	country: 'India', symbol: '2h', unblock:'no'},
  {position: 'shubham', name: 'Boron', 	country: 'India', symbol: '2h',unblock:'no'},
 
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'country', 'symbol','unblock'];
  dataSource = ELEMENT_DATA;
  speaks: string[] = ['Russian', 'English', 'Ukrainian'];

  @ViewChild("search2", { static: false }) search2ElementRef: ElementRef;
  public userID: any;
  public data: any = {};
  _userDetailObservable: any;
  userimg:any
  public userForm: FormGroup;
  public geoCoder;
  zoom = 8;
  user:any={};
  firstName :any  
  public _host = environment.url;
  slotData = [];
  giftData = [];
  id:any;
  lastName :any 
  mobileNo :any 
  bibliography :any
  datas:any
  //  address :any 
   email :any 
    gender :any
  locationerr:any
  today = new Date();
	lat: number
	long: number
  markers=[]
	public address;
  fileToUpload:any
  submitted=false;
  occupations:any=[];
  skills:any=[];
  @ViewChild('tagInput', { static: false }) tagInputRef: ElementRef;
  @ViewChild('tagSkillInput', { static: false }) tagInputRef2: ElementRef;
  public temparr = [];
  public temparr2 = [];
  subjects:any=[];
  @ViewChild('tagSubjectInput', { static: false }) tagInputRef3: ElementRef;
  public temparr3 = [];
  lessons:any=[];
  @ViewChild('tagLessonInput', { static: false }) tagInputRef4: ElementRef;
  public temparr4 = [];
  // speaks:any=[];
  @ViewChild('tagSpeaksInput', { static: false }) tagInputRef5: ElementRef;
  public temparr5 = [];
  testPreparations:any=[];
  @ViewChild('tagTestInput', { static: false }) tagInputRef6: ElementRef;
  public temparr6 = [];
  page = 1;
  // public _host = environment.url;
  filters: { page: number; count: number; search: string; } = {
    page: 1,
    count: 10,
    search: '',
  };
  promocodeService: any;
 
  _subscriberData: any;
  age=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

  constructor(
    private router : Router,
    private _activateRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private sharedService :SharedService,
    private _bs: BehaviorService,
    private formBuilder: FormBuilder,
    private credentialService: CredentialsService,

   private ProfileService:ProfileService,
  ) { 
    this.createUserForm();
  
  }

  ngOnInit() {
    if (this._activateRouter.snapshot.params['page']) {

      this.filters.page = JSON.parse(this._activateRouter.snapshot.params['page']);
      this.page = this.filters.page;
      Object.assign(this.filters, { page: this.filters.page });
      this.getGift();
      // this.getAllSubCategories();
    } else {
      this.page = 1
      this.getGift();
      // this.getAllSubCategories();
    }
    this.filters = this.credentialService.credentials ? this.credentialService.credentials.id : ''

    this.userID = this.credentialService.credentials.id;
    this.data = JSON.parse(localStorage.getItem('user'));
    this.userimg=this.data.image
    // this.data = JSON.parse(localStorage.getItem('user'));
    //   this.userimg=this.data.image
      if (this.data) {
        this.userID = this.data.id;
      
      }
    //  console.log('this.userID', this.userID)
    this.page = 1
      this.getUserDetail();
      this.getSlot(this.userID);
     
  }

  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("in image upload")
    let type: "users";
    this.spinner.show();
    setTimeout(() => {

      this.spinner.hide();
  }, 3000);
    this.sharedService.uploadImage(this.fileToUpload, 'users').subscribe((event: HttpEvent<any>) => {
         
      switch (event.type) {
        case HttpEventType.Sent:
          // console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          // console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          // this.progress = Math.round(event.loaded / event.total * 100);
          // console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
           console.log('User successfully created!', event.body);
          if (event.body.success) { 
            // this.router.navigate(["/profile/view"]);
            // this.spinner.hide();
            this.userimg = event.body.data.imagePath;
            this.userForm.patchValue({ image: this.userimg })
            this.updateUser()
            this.spinner.hide();
         

          } else {
            window.scrollTo(0, 0);
            this.spinner.hide();

          }
          setTimeout(() => {
            // this.progress = 0;
            // this.coverImageLoader = false;
          }, 100);
          this.spinner.hide();
      }
      
    }, (error) => {
      this.spinner.hide();
      this.snackBar.open(error, '', {
        duration: 2500,
      });
    });
  }

  
  createUserForm() {  
		this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // mobileNo: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
			company: [""],
      // country: [""  ],
      age: [""],
      email:['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$")]],
			// gender: ["", Validators.required],
      image:[''], 
      occupation: [""],
      skills:[""],
      lessons:[""],
      speaks:[""],
      testPreparation:[""],
			accents: [""],
      intoductoryLink:[""]
		});
  }
  
  get f() {
		return this.userForm.controls;
	}

  getUserDetail() {

    this.spinner.show();
    setTimeout(() => {

      this.spinner.hide();
  }, 3000);
    this._userDetailObservable = this.sharedService
      .getDetail(this.data.id)
      .subscribe(
        (res) => {
          if (res.success) {
            if(res.data.role == 'teacher'){
              this.userForm.controls['email'].disable();
            }
          
            this.user = res.data
            this.userForm.patchValue({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
              mobileNo: res.data.mobileNo,
              address:res.data.address,
              gender:res.data.gender,
              bibliography:res.data.bibliography,
              country:res.data.country,
              company:res.data.company,
              age:res.data.age,
              area:res.data.area,
              state:res.data.state,
              postcode:res.data.postcode,
              accents:res.data.accents,
              image: this.user.image,
              intoductoryLink:this.user.intoductoryLink,
              speaks: this.user.speaks,
              // occupation:this.user.occupation,
              // skills:this.user.skills,
              subjects:this.user.subjects
            });
            this.userimg = this.user.image;

            this.data = res.data;
            localStorage.setItem("user", JSON.stringify(this.data));
            this._bs.setUserData(res.data);
          } else {
            this.snackBar.open(res.error.message);
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.snackBar.open(error, '', {
            duration:2500,
          });
          this.spinner.hide();

        }

      );
  }

  // getGift() {
  //   this.spinner.show();
  //     this.ProfileService.getGifts(this.filters).subscribe(res => {
  //     if (res.success) {

  //       this.giftData = res.data;
  //     +
  //       this.spinner.hide();
  //     } 
  //     (error) => {
  //       this.spinner.hide();
  //       this.snackBar.open(error, '', {
  //         duration:2500,
  //       });
  //       this.spinner.hide();
  //     }
  //   })
  // }

  getGift() {
    this.spinner.show();
   
    this._subscriberData = this.ProfileService.getGifts(this.filters).subscribe((response) => {
      if (response.success) {
        // this.subCategoryData = [];
        this.giftData = response.data;        
        this.spinner.hide();
      //   this.ngxNotificationMsgService.open({
      //     status: NgxNotificationStatusMsg.SUCCESS,
      //     header: '',
      //     messages: [response.message]
      //  });
      } else {
     
        // this.subCategoryData = response.data.map(data => {
        //   return {
        //     id: data.id,
        //     name: data.name,
        //     cat_type: data.cat_type,
        //     date: data.createdAt,
        //     createdAt: data.createdAt,
        //     deletedAt: data.deletedAt,
        //     status: data.status
        //   }
        // });
        // this.totalSubCats = response.total;
     
        this.spinner.hide();
      }
    },
    // error=>{
    //   this.spinner.hide();
    //   this.ngxNotificationMsgService.open({
    //     status: NgxNotificationStatusMsg.FAILURE,
    //     header: '',
    //     messages: [error]
    //  });
    // }
    );
  }

  getSlot(id) {
    this.spinner.show();
    this.ProfileService.getDetails(`transactions?user_id=${id}`).subscribe(res => {
      if (res.success) {

        this.slotData = res.data;
      
        this.spinner.hide();
      } 
      (error) => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration:2500,
        });
        this.spinner.hide();

      }
    })
  }
  updateUser() {
   
    this.submitted=true;
  
    console.log(this.userForm, "userForm" );
    
    if (!this.userForm.invalid) {
      this.spinner.show();
      let data = this.userForm.getRawValue();
      // data['id'] = this.data.id;
      data['skills'] = this.skills.length>0?this.skills:this.user.skills;
      data['occupation'] = this.occupations.length>0?this.occupations:this.user.occupations;
      // data['subjects'] = this.subjects.length>0?this.subjects:this.user.subjects;
      data['lessons'] = this.lessons.length>0?this.lessons:this.user.lessons;
      // data['speaks'] = this.speaks.length>0?this.speaks:this.user.speaks;
      data['testPreparation'] = this.testPreparations.length>0?this.testPreparations:this.user.testPreparation;
      this.sharedService.updateUser(data,this.data.id).subscribe(
      (res) => {
        let url;
        if (res.success) {
          this.datas = res
          const storage = localStorage;
          storage.setItem('user', JSON.stringify(this.data));
          this._bs.setUserData(this.datas);
          this.skills=[];
          this.occupations=[];
          this.subjects=[];
          this.lessons=[];
          this.speaks=[];
          this.testPreparations=[];
          this.getUserDetail();
          // window.location.reload();
          this.spinner.hide();
          url = '/profile/view';
          this.router.navigate([url]);
          this.snackBar.open('Updated Successfully', '', {
            duration:3000,
          });
        } else {
          this.snackBar.open(res.error.message, '', {
            duration:2500,
          });
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration:2500,
        });
      }
    );
  }
  }
  // updateUserImage(imagedata) {
  //   console.log(imagedata);
  //   if (imagedata) {
  //     // window.location.reload()

  //   this.spinner.show();
  //   let data = imagedata
  //   data['id'] = this.data.id;
  //   this.sharedService.updateUser(data).subscribe(
  //     (res) => {
  //       if (res.success) {
  //         window.location.reload()

  //         this.router.navigateByUrl('/profile/view')
  //       } else {
  //         this.snackBar.open(res.error.message, '', {
  //           duration:2500,
  //         });
  //       }
  //       this.spinner.hide();
  //     },
  //     (error) => {
  //       this.spinner.hide();
  //       this.snackBar.open(error, '', {
  //         duration:2500,
  //       });
  //     }
  //   );
  // }
  // }

  focusTestTagInput(): void {
    this.tagInputRef6.nativeElement.focus();
  }

  onKeyUpTest(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.testPreparation.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTestTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addTestTag(inputValue);
          this.userForm.controls.testPreparation.setValue('');
        // }
      }
    
    }
  }

  addTestTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.testPreparations, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr6.push(tag);
      this.testPreparations = this.temparr6;
    }
  }

  removeTestTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.testPreparations, tag);
    } else {
      this.testPreparations.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }

  focusSpeaksTagInput(): void {
    this.tagInputRef5.nativeElement.focus();
  }

  onKeyUpSpeaks(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.speaks.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeSpeaksTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addSpeaksTag(inputValue);
          this.userForm.controls.speaks.setValue('');
        // }
      }
    
    }
  }

  addSpeaksTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.speaks, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr5.push(tag);
      this.speaks = this.temparr5;
    }
  }

  removeSpeaksTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.speaks, tag);
    } else {
      this.speaks.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }

  focusLessonsTagInput(): void {
    this.tagInputRef4.nativeElement.focus();
  }

  onKeyUpLessons(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.lessons.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeLessonTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addLessonTag(inputValue);
          this.userForm.controls.lessons.setValue('');
        // }
      }
    
    }
  }

  addLessonTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.lessons, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr4.push(tag);
      this.lessons = this.temparr4;
    }
  }

  removeLessonTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.lessons, tag);
    } else {
      this.lessons.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }

  focusTagSubjectInput(): void {
    this.tagInputRef3.nativeElement.focus();
  }

  onKeySubjectUp(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.subjects.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeSubjectTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addSubjectTag(inputValue);
          this.userForm.controls.subjects.setValue('');
        // }
      }
    
    }
  }

  addSubjectTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.subjects, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr3.push(tag);
      this.subjects = this.temparr3;
    }
  }

  removeSubjectTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.subjects, tag);
    } else {
      this.subjects.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }


  focusTagSkillInput(): void {
    this.tagInputRef2.nativeElement.focus();
  }

  onKeyUpSkill(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.skills.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeskillTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addSkillTag(inputValue);
          this.userForm.controls.skills.setValue('');
        // }
      }
    
    }
  }

  addSkillTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.skills, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr2.push(tag);
      this.skills = this.temparr2;
    }
  }

  removeskillTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.skills, tag);
    } else {
      this.skills.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.userForm.controls.occupation.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      console.log(event);
        if (event.code === 'Comma') {
          // if(!this.userForm.invalid){
          this.addTag(inputValue);
          this.userForm.controls.occupation.setValue('');
        // }
      }
    
    }
  }

  addTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.occupations, tag)) {
      //  this.register2.socialLinks.push(tag);
      this.temparr.push(tag);
      this.occupations = this.temparr;
    }
  }

  removeTag(tag?: string): void {
    console.log(tag)
    if (!!tag) {
      pull(this.occupations, tag);
    } else {
      this.occupations.splice(-1);
      // this.userForm.patchValue({
      //   'occupation':this.occupations
      // })
    }
  }

  ngOnDestroy(): void {
    if (this._userDetailObservable) {
      this._userDetailObservable.unsubscribe();
    }
  }

}
