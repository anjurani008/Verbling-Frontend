import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BehaviorService {

    public userData: BehaviorSubject<object> = new BehaviorSubject<object>({});
    public user:BehaviorSubject<object> = new BehaviorSubject<object>({});
    public addClick:BehaviorSubject<any> = new BehaviorSubject<any>({});
    public changePhotographyData:BehaviorSubject<any> = new BehaviorSubject<any>({});
    public categoryData:BehaviorSubject<any> = new BehaviorSubject<any>({});
    // public addClick:BehaviorSubject<any> = new BehaviorSubject<any>(null);

    rootUrl: string = environment.url;

    constructor() { }


    setUserData(data) {
        this.userData.next(data);
    }

    getUserData() {
        return this.userData.asObservable();
    }

    setUser( value ) {
        let user: object;
        let userObject = { user: value };
        this.user.next( userObject );
        return {};     
    }
    

    getIso:any =(p:any, minus:any = false)=>{
        console.log(p);
        
        let date = new Date(p);
        let ndate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

        if(minus){
            ndate.setDate(ndate.getDate()-1);
        }else{
            ndate.setDate(ndate.getDate()+1);
        }
        
        let value = ndate.toISOString();
        return value;
    }

    unsetUser( ) {       
        this.user.next({});
        return {};     
    }

    openModal() {
        document.getElementById("body").className = "modal-open";
    }

    closeModal() {
        document.getElementById("body").classList.remove("modal-open");
    }

    stringToDate(p:any,minusPlusDate=0){
        console.log(p);
        
        let d = p.split('-')
        let date = new Date()
        date.setFullYear(d[0])
        date.setMonth(Number(d[1])-1)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        date.setDate(Number(d[2])+minusPlusDate)
        
        return date;
     }
 
     dateToString(p:Date){
         return `${p.getFullYear()}-${p.getMonth()+1}-${p.getDate()}`
     }
}
