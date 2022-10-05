import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ViewChild("#trackerTable",{static:true}) trackerTable: ElementRef<HTMLInputElement>;
  public _host = environment.url;
  updateData: any;
  public userID: any;
  public user: any = {};
  currentUrl = '';
  role:any;
  data:any;
  addCls=false;
  imageData:any
  _userDetailObservable:any

  token:any=''
  userImage:any;
  notifications:any=[];
  totalNotifications=0
  notifications1:any=[];
  totalNotifications1=0

  
  @Input() tooglebutton: any;
  @Output() Layout = new EventEmitter<any>();
  notificationCount: any;
  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    public _bs: BehaviorService,
    public sharedService: SharedService,
    // private credentials:CredentialsService,
    private spinner: NgxSpinnerService,
    private credentialService:CredentialsService,
    private viewportScroller: ViewportScroller

  ) { }
  ngOnInit() {
    
    this.userID = this.credentialService.credentials?this.credentialService.credentials.id:'';
    if(this.userID){
      this.getUserDetail();
      
     
      // this.getNotificationCount();
    }else{
      
    }
		this.imageData = JSON.parse(localStorage.getItem('user'));
    // this.userImage = this.imageData.image
    this.user = this.credentialService.credentials;
    // this.getNotification();
    // this.user = JSON.parse(localStorage.getItem('user'));
    // this.user = localStorage.getItem("user");

    this.token = localStorage.getItem("token");
    if (this.user) {
      this.userID = this.user.id;
      this.role= this.user.role;
      
    }
    
    this._bs.getUserData().subscribe((res: any) => {
      console.log(res);
      
      if(res){
        this.updateData = res;
        this.user=res
        if (res.firstName)
          localStorage.setItem("user", JSON.stringify(this.updateData));
      this.user = JSON.parse(localStorage.getItem('user'));
        // if (res.firstName)
        //   localStorage.setItem("user", JSON.stringify(this.updateData));
      }else{

        this.updateData = this.imageData?this.imageData:'';
      }
     
    });
    if (this.user) {
      this.userID = this.user.id;
      
     
    
     
    }
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.currentUrl = evt.url;
      // this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem('credentials'));
      if (this.user) {
        this.userID = this.user.id;
      }
    });
  
  
  
}
addClss(){
  this.addCls=!this.addCls;
}



// updateReadStatus(){
//   let formData={
//     'id':this.userID,
//     role: this.user.role
//   }
//   this._userDetailObservable = this.sharedService.updateNotification(formData).subscribe(
//     (res) => {
//       if (res.success) {
//        this.getNotificationCount();
//        if(this.user.role=='photographer'){
//         this.getNotifications()
//       }
//       if(this.user.role=='user'){
//         this.getNotification();
//       }
//         // this._bs.setUserData(res.data);
//       } else {
//       }
//       this.spinner.hide();
//     },
//     (error) => {
//       this.spinner.hide();
//       // this.snackBar.open(error, 'close',{
//       //   duration:2500,
//       // }
//       // );
//     }
//   );
// }




getUserDetail() {
  this._userDetailObservable = this.sharedService
    .getDetail(this.userID)
    .subscribe(
      (res) => {
        if (res.success) {
          this.data = res.data;
          // localStorage.setItem("user", JSON.stringify(this.data));
          this._bs.setUserData(res.data);
        } else {
          // this.snackBar.open(res.error.message);
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        // this.snackBar.open(error, 'close',{
        //   duration:2500,
        // }
        // );
      }
    );
}

 
  logout() {
   
    this.credentialsService.logout().subscribe(res => {
      this.router.navigate(['/']);
      this._bs.unsetUser();
      this._bs.setUserData({});
      this.token=''
      });
     
   
    // this.toastr.success("Logout Successfully", "Success");
  }


 


}
