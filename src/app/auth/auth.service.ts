import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsService } from './credentials.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.url;

  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  /**
* @method
* @name login
* @description
* Authenticates the user.
* Request body:json {
       'email': string,
       'password': string
* }
* @param context The login parameters.
* @return Promise.
*/
login(context) {
  return this.httpClient.post(this._baseUrl + `user/signin`, context).pipe(
    map((response: any) => {
      this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  );
}

Signup(context) {
  // let param = this.getParams(context);
  return this.httpClient.post(this._baseUrl + `signup`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )

}

// logout() {
//   this.credentialsService.setCredentials();
//   return of(true);
// }

changePass(params) {
  let param = this.getParams(params);
  return this.httpClient.put(this._baseUrl + 'change/password', params).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}


sendEmail(formData): Observable<any> {
  return this.httpClient.post(this._baseUrl + `forgotpassword`, formData).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}
// getCounter(tick) {
//   return timer(0, tick) 
// }

resetPassword(formData): Observable<any> {
  return this.httpClient.put(this._baseUrl + `reset/Password`, formData).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}


OtpVarification(data) {
  return this.httpClient.put(this._baseUrl + `verifiyOtp`, data).pipe(
    map((response: any) => {
      this.credentialsService.setCredentials(response.data);

      return response;
    }),
    catchError(this.handleError)
  )
}

resendOTP(data) {
  return this.httpClient.put(this._baseUrl + `ResendOtp`, data).pipe(
    map((response: any) => {
      this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  )
}



getParams(parameters) {
  let params = new HttpParams();
  Object.keys(parameters).map((key) => {
    params = params.set(key, parameters[key]);
  })
  return params;
}

handleError(error: HttpErrorResponse) {
  if (error.error.code == 401) {
    return throwError('');
  } else if (error.error.code == 404) {
    return throwError(error.error.message);
  } else if (error.error.code == 400) {
    return throwError(error.error.message);
  }
  else if (error.error.code == 200) {
    return throwError(error.error.message);
  }
  return throwError(
    'Something bad happened; please try again later.');
}
}


