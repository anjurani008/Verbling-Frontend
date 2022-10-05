import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CredentialsService } from "../auth/credentials.service";
import { BehaviorService } from "./behavior.service";
 

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private credentialService: CredentialsService,
      private _bs:BehaviorService,
      public router: Router, private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          console.log(err);
          
            if (err.status === 401) {
                
                if (err.error.message && err.error.message!==''){
                //   this.ngxNotificationMsgService.open({
                //     status: NgxNotificationStatusMsg.FAILURE,
                //     header: '',
                //     messages: [err.error.message]
                //  });
                  // this.toastr.error(err.error.message,'Error'); 
                }else if (err.error.error.message && err.error.error.message !== "") {
                //   this.ngxNotificationMsgService.open({
                //     status: NgxNotificationStatusMsg.FAILURE,
                //     header: '',
                //     messages: [err.error.error.message]
                //  });
                    // this.toastr.error(err.error.error.message,'Error');
                  }  
                  
                this.credentialService.logout();
                this._bs.unsetUser();
                this._bs.setUserData({});
                // this.token=''
                this.router.navigateByUrl('/');
                return throwError(err.error);
            }else  if (err.status == 400) {
              if (err.error.message && err.error.message!==''){
                // this.snackBar.open(err.error.message,'Error');
              }else if (err.error.error.message && err.error.error.message !== "") {
                  // this.toastr.error(err.error.error.message,'Error');
                }  
              }else  if (err.status == 404) { 
                if (err.error.message && err.error.message!==''){
                //   this.ngxNotificationMsgService.open({
                //     status: NgxNotificationStatusMsg.FAILURE,
                //     header: '',
                //     messages: [err.error.message]
                //  });
                } else  if (err.error.error.message && err.error.error.message !== "") {
                //   this.ngxNotificationMsgService.open({
                //     status: NgxNotificationStatusMsg.FAILURE,
                //     header: '',
                //     messages: [err.error.error.message]
                //  });
                } 
                
              }else if (err.status === 500) {
                if (err.error.message!==''){
                    // this.toastr.error(err.error.message,'Error');
                  }else if (err.error.error.message !== "") {
                      // this.toastr.error(err.error.error.message,'Error');
                    } 
            }
            // const error = err.error.message || err.code;
            return throwError(err.error);
        }))
    }
}