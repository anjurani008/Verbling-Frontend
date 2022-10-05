import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  public _host = environment.url;

  public contentID: any;
  public content: any = {};
  conditionalForm: boolean = false;

  
  constructor(
    
    private _activateRouter: ActivatedRoute,
    private ngxNotificationMsgService: NgxNotificationMsgService,
    private spinner: NgxSpinnerService,
    private contService: ContentService,
    private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.contentID ="privacy-policies";
    // this.contentID = this._activateRouter.snapshot.params['slug']; 
    // console.log(this.contentID ,"cinternt")
    if(this.contentID){
      this.conditionalForm = true;
      this.spinner.show();

      this.contService.get(this.contentID).subscribe((res: any) => {
        if (res.data.length == 0) {
          this.content = [];
         
        } else {
          this.content = res.data;
          this.spinner.hide();
  
        }
      },
      error => {
        this.spinner.hide();
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: '',
          messages: [error]
       });

      });
    }else{
     this.conditionalForm = false;
    }
  }

}
