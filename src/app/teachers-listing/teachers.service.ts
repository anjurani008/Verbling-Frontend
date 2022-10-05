import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private _baseUrl = environment.url;

  constructor(
    private httpClient: HttpClient
  ) { }

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
addMmember(context) {
  return this.httpClient.post(this._baseUrl + `add/user`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

bookReSchedule(context){
  return this.httpClient.put(this._baseUrl + `rescheduleBooking`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

getAllUsers(param?){
  let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'users', { params: params }).pipe(
          map((response: any) => {
            return response;
          }),
          catchError(this.handleError)
        )
}


getSlot(url) {
  return this.httpClient.get(this._baseUrl + url).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

get(id) {
  return this.httpClient.get(this._baseUrl + 'user/details/' + id).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
} 
 userid: any
getUser(id,userid?) {
  // if(this.userid == undefined){
  //   this.userid = ''
  // } this.userid = userid
 

  console.log(id);
  
  return this.httpClient.get(this._baseUrl + 'user?id=' + id+'&userId='+userid).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}


updateMmember(data) {
  return this.httpClient.put(this._baseUrl + `user`, data).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}


deleteRecord(param?) {
  
  return this.httpClient.delete(this._baseUrl + 'delete?id='+param.id+'&model='+param.model ).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

status(id, model, status) {
  let url = this._baseUrl + 'change/status?id=' + id + '&model=' + model + '&status=' + status;

  return this.httpClient.put(url, {}).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}
// getAllSubjects() {
//   return this.httpClient.get(this._baseUrl + 'subjectlist').pipe(
//     map((response: any) => {
//       return response;
//     }),
//     catchError(this.handleError)
//   )
// }

getAllSubjects(param?) {
  let params = new HttpParams();
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.get(this._baseUrl + 'courses', { params: params }).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getAllSpeaksData(){
  return this.httpClient.get(this._baseUrl + 'speakslist').pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getAllTestPreprationData(){
  return this.httpClient.get(this._baseUrl + 'testPreparationlist').pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getAllIndividualPlans(id){
  return this.httpClient.get(this._baseUrl + 'getplanbytecherId?id='+id).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getCountryList(){
  return this.httpClient.get(this._baseUrl + 'countrylist').pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getAllPlans(param?){
  let params = new HttpParams();
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.get(this._baseUrl + 'getplanslist',{ params: params }).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getFavourites(search){
  return this.httpClient.get(this._baseUrl + 'favourites?search='+search).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

// getFavouriteteacher(){
//   return this.httpClient.get(this._baseUrl + 'favourites').pipe(
//     map((response: any) => {
//       return response;
//     }),
//     catchError(this.handleError)
//   )
// }
getFavouriteteacher(param?){
  let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'user/favourites', { params: params }).pipe(
          map((response: any) => {
            return response;
          }),
          catchError(this.handleError)
        )
}

addCard(context) {
  return this.httpClient.post(this._baseUrl + `add/card`, context).pipe(
    map((response: any) => {
      // this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  );
}

payment(context) {
  return this.httpClient.post(this._baseUrl + `payment`, context).pipe(
    map((response: any) => {
      // this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  );
}

individualPayment(context){
  return this.httpClient.post(this._baseUrl + `individualpayment`, context).pipe(
    map((response: any) => {
      // this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  );
}

bookSchedule(context){
  return this.httpClient.post(this._baseUrl + `book/schedule`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

getEquipments(param?){
  let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'photographer/equipments', { params: params }).pipe(
          map((response: any) => {
            return response;
          }),
          catchError(this.handleError)
        )
}
changeEquipmentStatus(id , isVerified) {
  let url = this._baseUrl + 'photography/verify?id=' +id + '&isVerified='+ isVerified;

  return this.httpClient.put(url, {}).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

addFavourite(context){
  return this.httpClient.post(this._baseUrl + 'favourite',context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

getAvailability(param?) {
  let params = new HttpParams();
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.get(this._baseUrl + 'getScheduleslot', { params: params }).pipe(
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
  if (error.error.code == 401) {
    return throwError(error.error.message);
  } else if (error.error.code == 404) {
    return throwError(error.error.message);
  } else if (error.error.code == 400) {
    return throwError(error.error.message);
  }
  return throwError(
    'Something bad happened; please try again later.');
}
}
