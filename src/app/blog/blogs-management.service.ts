import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CredentialsService } from "../auth/credentials.service";

@Injectable({
  providedIn: "root",
})
export class BlogsManagementService {
  actionType = new BehaviorSubject("active");
  private _baseUrl = environment.url;

  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient
  ) {}

  
  // getAllBlogs(param?) {
  
  //   return this.httpClient
  //     .get(this._baseUrl + "bloglist?isDeleted=false")
  //     .pipe(
  //       map((response: any) => {
  //         return response;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
  getParams(parameters) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }

  getAllBlogs(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'bloglist', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  get(id) {
    return this.httpClient.get(this._baseUrl + "blog?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.code == 401) {
      return throwError("Session Expired. Please login.");
    } else if (error.error.code == 404) {
      return throwError(error.error.message);
    } else if (error.error.code == 400) {
      return throwError(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
