import { Injectable } from '@angular/core';
import { of } from 'rxjs';
const credentialsKey = 'credentials';
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private _credentials: any | null = null;

  constructor() {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /*set user credentials*/
  setCredentials(credentials?, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      // const storage = remember ? localStorage : sessionStorage;
      const storage =  localStorage ;
      
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      storage.setItem('token', credentials.access_token);
      storage.setItem('user', JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  /**
 * Checks is the user is authenticated.
 * @return True if the user is authenticated.
 */
  isAuhenticated(): boolean {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    return !!this._credentials;
  }

  /**
  * Gets the user credentials.
  * @return The user credentials or null if the user is not authenticated.
  */
  get credentials() {
    return this._credentials;
  }

  /**
  * Gets the user credentials.
  * @return The user credentials or null if the user is not authenticated.
  */
  get token() {
    return this._credentials ? this._credentials.access_token : '';
  }

  /**
    * @method
    * @name logout
    * Logs out the user and clear credentials.
    * @return boolean
    */
  logout() {
     this.setCredentials();
    return of(true);
  }
}
