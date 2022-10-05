import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _baseUrl = environment.url;

  constructor(
    private httpClient: HttpClient) {

  }

/**
* @method
* @name addManager
* @description
* Authenticates the user.
* Request body:json {
       'email': string,
       'firstName': string,
       'lastName': string,
       'mobileNo': integer
* }
* @param context The Add manager parameters.
* @return Promise.
*/

  update(context, id) {
    return this.httpClient.put(this._baseUrl + `user?id=` + id, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getDetail(id) {
    // let params= this.getParams(param)
    return this.httpClient.get(this._baseUrl + 'user?id=' + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getDetails(id) {
    // let params= this.getParams(param)
    return this.httpClient.get(this._baseUrl + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  // getGifts(id) {
  //   return this.httpClient.get(this._baseUrl + '' + id).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   ) 
  // }


  getGifts(param?){
    let params = new HttpParams();
      if (param) {
        for (let key of Object.keys(param)) {
          params = params.set(key, param[key])
        }
      }
      return this.httpClient.get(this._baseUrl + 'getAllCoupons', { params: params }).pipe(
            map((response: any) => {
              return response;
            }),
            catchError(this.handleError)
          )
  }


  uploadImage(fileToUpload: File, type = 'users') {
    // console.log('type')
    let params = '?modelName=' + type
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // formData.append('modelName',type);
    return this.httpClient.post(this._baseUrl + `upload/image?modelName=` + type, formData).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(this.handleError)
    )
  }
  removeImage(data, modal) {
    return this.httpClient.delete(this._baseUrl + `remove/image?name=` + data + '&model=' + modal).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  deleteImage(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'Image/delete', { params: params }).pipe(
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
