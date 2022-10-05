import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CredentialsService } from '../auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  useritems:any;
  private _baseUrl = environment.url;

  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient) {

  }
  getCoupon(id) {
    return this.httpClient.get(this._baseUrl + 'coupon?id=' + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllReview(param?){
    let params = new HttpParams();
      if (param) {
        for (let key of Object.keys(param)) {
          params = params.set(key, param[key])
        }
      }
      return this.httpClient.get(this._baseUrl + 'photographerReview', { params: params }).pipe(
            map((response: any) => {
              return response;
            }),
            catchError(this.handleError)
          )
  }


 addBankDetails(context) {
  return this.httpClient.post(this._baseUrl + `getbanktoken`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

socialShare(context){
  return this.httpClient.put(this._baseUrl + `socialSharingstatus`, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

  getAllCoupen(param?){
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
  

  getAllBanners(param?){
    let params = new HttpParams();
      if (param) {
        for (let key of Object.keys(param)) {
          params = params.set(key, param[key])
        }
      }
      return this.httpClient.get(this._baseUrl + 'getAllBanners', { params: params }).pipe(
            map((response: any) => {
              return response;
            }),
            catchError(this.handleError)
          )
  }

  autoLogin(context) {
    return this.httpClient.post(this._baseUrl + `user/auto/login`, context).pipe(
      map((response: any) => {
        this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    ); 
  }
  updateUser(context,id) {
    return this.httpClient.put(this._baseUrl + `user?id=`+id, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
        
      }),
      catchError(this.handleError)
    );
  }
  logout(){
    return this.httpClient.post(this._baseUrl + `logout`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
 


  addCard(context) {
    return this.httpClient.post(this._baseUrl + `save/card`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  payment(context) {
    return this.httpClient.post(this._baseUrl + `checkout`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAllPlans(param){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'plans',{params:params}).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getWithParams(url,data){
    let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + url,{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getWithUsersParams(url,data,subjects=[],speaks=[]){
    let params= this.getParams(data)
    let subjectsArray = JSON.stringify(subjects);
    let speaksArray = JSON.stringify(speaks);
    return this.httpClient.get(
      this._baseUrl + url +
      "?" +
      params.toString() +
      "&subjects=" +
      subjectsArray +
      "&speaks=" +
      speaksArray).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  gaveReview(context) {
    return this.httpClient.post(this._baseUrl + `postReview`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getBooking(param){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'book',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }  
  
  getCouponDetail(param){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'coupondata',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
     

  addDate(formData) {
    return this.httpClient.post(this._baseUrl + `saveavailability`, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  


    
  getAvailability(param?){
    let params = new HttpParams();
      if (param) {
        for (let key of Object.keys(param)) {
          params = params.set(key, param[key])
        }
      }
      return this.httpClient.get(this._baseUrl + 'getavailabilityListById', { params: params }).pipe(
            map((response: any) => {
              return response;
            }),
            catchError(this.handleError)
          )
  }

  // getAvailability() {
  //   return this.httpClient.get(this._baseUrl + 'getavailabilityListById').pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   )
  // }





  getBookingDetails() {
    return this.httpClient.get(this._baseUrl + 'accept/list').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }




  getDetail(id) {
    return this.httpClient.get(this._baseUrl + 'user?id='+id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getnotification(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'getuseracceptedBookings',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  
  getAccessories(param){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'accessories',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getAllCategories(param){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    // let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'categories',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getEmail(email){
    let params= this.getParams(email)
    return this.httpClient.get(this._baseUrl + 'userexit',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  addCategory(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

 addPlan(context)
 {
  return this.httpClient.post(this._baseUrl + `book`, context).pipe(
    map((response: any) => {
      // this.credentialsService.setCredentials(response.data);
      return response;
    }),
    catchError(this.handleError)
  );

 }

 getnotificationCount(param){
  let params = new HttpParams();
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.get(this._baseUrl + 'getNotificationscount',{params:params}).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
 }

 updateNotification(context){
  return this.httpClient.put(this._baseUrl + `updateNotificationsReadStatus
  `, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
 }

  addUser(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        this.useritems = JSON.parse(localStorage.getItem('user'));
        if(!this.useritems){
          let data=response.data.bookBy
          data['access_token']=response.data.access_token
          this.credentialsService.setCredentials(data);
        }
        
        return response;
      }),
      catchError(this.handleError)
    );
  }


  addLocation(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }


  addTime(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }



  addShoot(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addComment(context) {
    return this.httpClient.post(this._baseUrl + `book`, context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }


  

  

 
  uploadMultipleImage(params,formData) {
    return this.httpClient.post(this._baseUrl + `multiple/images`+params,formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }


  uploadImage(fileToUpload: File, type) {
    let params = "?modelName=" + type;
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    formData.append("modelName", type);
    return this.httpClient
      .post(this._baseUrl + `upload/image?modelName=` + type, formData,{
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  removeImage(data,modal){
    return this.httpClient.delete(this._baseUrl + `deleteImage?name=`+data+'&type='+modal).pipe(
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
    return this.httpClient.delete(this._baseUrl + 'deleteImage', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  
  getAllFaqs(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'getAllFaq', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  getAllBannner(param?){
    let params = new HttpParams();
      if (param) {
        for (let key of Object.keys(param)) {
          params = params.set(key, param[key])
        }
      }
      return this.httpClient.get(this._baseUrl + 'getAllBanners', { params: params }).pipe(
            map((response: any) => {
              return response;
            }),
            catchError(this.handleError)
          )
  }
  getNotifications(param?){
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'booking/request', { params: params }).pipe(
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


  /**
	 * @param {*} req 
	 * @param {*} res 
	 * @description: For Get All Plan's On Home Page
	 * @createdAt 16/12/2021
	 * @createdBy : Himanshu Gupta
  */	
  getAllPlan(data){
    let params= this.getParams(data)
    return this.httpClient.get(this._baseUrl + 'frontend/plans',{params:params}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }



}