import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: any;
  contentData:any={};
  public showFooter: boolean = false;
  public showSidebar:boolean = false;
  constructor(
      private _router : Router,
      // private spinner: NgxSpinnerService,
      // private toastr: ToastrService,
      // private _bs: BehaviorService,
      // private contentService: ContentService,
      private spinnerService: NgxSpinnerService,
      ) {
        this._router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
          return;
      }
      if (evt.url.indexOf('dashboard') >= 0) {
        this.showFooter = false;
      }else  if (evt.url.indexOf('/home') >= 0) {
        this.showFooter = true;
      }  else {
        this.showFooter = true;
      }
    })
       }

  ngOnInit(): void {
    // this.user = this.credentialsService.credentials ? this.credentialsService.credentials : '';
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
      return;
  }
 
  if( evt.url.indexOf('profile/me') >=0 || evt.url.indexOf('auth/settings') >=0|| evt.url.indexOf('content/contactus') >=0|| evt.url.indexOf('content/privacy') >=0|| evt.url.indexOf('content/terms-of-use') >=0|| evt.url.indexOf('content/faq') >=0|| evt.url.indexOf('content/disclaimer') >=0||evt.url.indexOf('content/aboutus') >=0){
          this.showSidebar = false;                               
      } else {
              this.showSidebar = true;                               
      }
})
  }

}
