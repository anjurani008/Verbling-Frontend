import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CredentialsService } from '../auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private _baseUrl = environment.url;

  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient) {

  }


  add(context) {
    return this.httpClient.post(this._baseUrl + `content`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  update(context) {
    return this.httpClient.put(this._baseUrl + `content`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  get(text) {
    return this.httpClient.get(this._baseUrl + 'content?slug=' + text).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  getAllContent(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'contents', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  deleteRecord(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'delete', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  status(id, model, status) {
    let url = this._baseUrl + 'changeStatus?id=' + id + '&model=' + model + '&status=' + status;

    return this.httpClient.put(url, {}).pipe(
      map((response: any) => {
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
    console.log(error);
    if (error.error.code == 401) {
      return throwError('Session Expired. Please login.');
    } else if (error.error.code == 404) {  
      return throwError(error.error.message);
    }
    else if (error.error.code == 400) {
      return throwError(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


}
