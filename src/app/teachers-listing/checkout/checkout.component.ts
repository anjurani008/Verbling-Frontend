import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { TeachersService } from '../teachers.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private _subscriberData: any;
  planData:any=[];
  selectedPlan:any={};
  card: any = {
    card_number: null,
    exp_month: '',
    exp_year: '',
    cvc: '',
    isDefault: false

  }
  public customPatterns = { '0': { pattern: new RegExp('\[0-9\]') } };
  totalPrice=0
  errMessage: any;
  errMessageCard: any;
  submitted = false;
  public cardForm: FormGroup;
  public user: any = {};
  showPlanMessage=false;
  planType: any='';

  constructor(
    private spinner: NgxSpinnerService,
    private teacherService: TeachersService,
    private snackBar: MatSnackBar,
    private _bs: BehaviorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._bs.user.subscribe((obj) => {
      this.user = obj ? (obj["user"] ? obj["user"] : {}) : {};
    });
    // this.user = this.credentialService.credentials;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.activatedRoute.queryParams.subscribe((params) => {
			// this.userID = params.id;
			// if (this.userID) {
			// 	this.autoLogin();
			// }
      // if(params.planType=='paid'){
        console.log(params);
        this.planType = params.planType;
        if(params.planType=='Individual'){
          this.getIndividualPlans(params.teacherid);
        }else{
          this.getAllPlans(params.planType);
        }
        
      // }
		});
  }

  getIndividualPlans(id){
    this.spinner.show();
    this._subscriberData = this.teacherService.getAllIndividualPlans(id).subscribe((response) => {
      if (response.data.length == 0) {
        this.planData = [];
        // this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open(response.error.message, '', {
          duration: 2500,
        });
      } else {
        this.planData = response.data;
        this.spinner.hide();

      }
    },
      error => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      }
    );
  }
  

  getAllPlans(planType){
    this.spinner.show();
    let filters = {
      planType:planType=='Lessons'?'paid':planType
    }
    this._subscriberData = this.teacherService.getAllPlans(filters).subscribe((response) => {
      if (response.data.length == 0) {
        this.planData = [];
        // this.totalItems = response.total;
        // this.isLoading = false;
        this.spinner.hide();
        this.snackBar.open('No plan exist!', '', {
          duration: 2500,
        });
      } else {
        this.planData = response.data;
        this.spinner.hide();

      }
    },
      error => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 2500,
        });
      }
    );
  }

  getMonth() {
    if (this.card.exp_month > 12) this.card.exp_month = 12;
  }

  addSingleCard(){

  }

  addCard() {
    console.log(Object.keys(this.selectedPlan).length);
    
    if(Object.keys(this.selectedPlan).length>0){
      this.showPlanMessage=false;
      this.submitted = true;
      if (!this.card.card_number ||
        !this.card.cvc ||
        !this.card.exp_month ||
        !this.card.exp_year) {
        this.errMessageCard = 'All Fields are required.'
        return;
      }
      this.spinner.show();
      this.errMessageCard = ''
      let data = JSON.parse(JSON.stringify(this.card));
      data['ownerName'] = this.user['fullName']
      // data.id = this.bookby;
  
      this.teacherService.addCard(data).subscribe((res: any) => {
  
        if (res.success) {
          this.submitted = false;
  
          // if (res.data.customer) {
            if(this.planType){
              let paymentdata = {
                cardId: res.data.card_id,
            // amount: this.finalPrice
                // user_id:this.user.id,
                customerId: res.data.customer_id,
                currency:'USD',
                // plan_id: this.selectedPlan.id,
                amount: this.totalPrice,
                // noOflessons: this.selectedPlan.noOflessons,
                // subscriptionPlanID: this.selectedPlan.stripePlanId
              }
              this.individualPayment(paymentdata)
            }else{
              let paymentdata = {
                user_id:this.user.id,
                customer_id: res.data.customer_id,
                plan_id: this.selectedPlan.id,
                amount: this.totalPrice,
                noOflessons: this.selectedPlan.noOflessons,
                subscriptionPlanID: this.selectedPlan.stripePlanId
              }
              this.payment(paymentdata)
            }

            
          
            // this.addSwellContacts();
          // }
        } else {
          this.errMessageCard = res.message;
          this.snackBar.open(res.message, '', {
            duration: 3000,
          });
          this.spinner.hide();
        }
       
      }, (error) => {
        this.snackBar.open(error, '', {
          duration: 3000,
        });
        this.errMessageCard = error.message;
        this.spinner.hide();
      });
    }else{
      console.log('called');
      
      this.showPlanMessage = true;
    }
   
  }

  individualPayment(data){
    this.teacherService.individualPayment(data).subscribe(
      (res) => {
        if (res.success) {

          this.spinner.hide();
          // this.snackBar.open(res.message, '',{
          //   duration:3000,
          // })
          Swal.fire({
            // title: "Glad you'll be joining us! You're almost there.",
            html: 'Payment was successful. Thank you for your purchasing!',
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              // if (this.bookingData.bookBy.role == 'guestuser'){
                // this.credentialService.logout();
                this.router.navigateByUrl("/dashboard/student");
              // }else{
              //   this.router.navigateByUrl("/bookings");
              // }
                
            }
          })
        } else {
          this.snackBar.open(res.error.message);
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 3000,
        });
      }
    );
  }

  payment(data) {

    this.teacherService.payment(data).subscribe(
      (res) => {
        if (res.success) {

          this.spinner.hide();
          // this.snackBar.open(res.message, '',{
          //   duration:3000,
          // })
          Swal.fire({
            // title: "Glad you'll be joining us! You're almost there.",
            html: 'Payment was successful. Thank you for your purchasing!',
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              // if (this.bookingData.bookBy.role == 'guestuser'){
                // this.credentialService.logout();
                this.router.navigateByUrl("/dashboard/student");
              // }else{
              //   this.router.navigateByUrl("/bookings");
              // }
                
            }
          })
        } else {
          this.snackBar.open(res.error.message);
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.snackBar.open(error, '', {
          duration: 3000,
        });
      }
    );
  }

  selectLesson(plan){
    this.showPlanMessage=false;
    this.selectedPlan = plan;
    this.calculatePrice();
  }

  calculatePrice(){
    console.log(this.selectedPlan);
    
    this.totalPrice = this.selectedPlan.noOflessons * this.selectedPlan.price
    console.log(this.totalPrice);
    
  }

}
