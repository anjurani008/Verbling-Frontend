import {
	Component,
	OnInit,
	TemplateRef,
	ViewChildren,
	PLATFORM_ID,
	Inject,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { CredentialsService } from "src/app/auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { TeachersService } from "src/app/teachers-listing/teachers.service";
import { environment } from "src/environments/environment";
import { ContentService } from '../content.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';



@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	selected: Date | null;
	public userID: any;
	_loginObservable: any;
	user: any = {};
	totalItems = 0
	page = 1;
	filters: { page: number; count: number; search: string; role: string, gender: string; isDeleted: Boolean } = {
		page: 1,
		count: 10,
		search: '',
		role: 'teacher',
		gender: '',
		isDeleted: false,
	};
	_subscriberData: any;
	public membersData: Array<any> = [];
	public response: any;

	_host = environment.url


	/*----slug content------*/
	public contentID: any;
	public content: any = {};
	public tutor: any = {};
	public lessonbook: any = {};
	public startlearning: any = {};
	public whylearnuroki: any = {};
	public verifiedteacher: any = {};
	public affordablelessons: any = {};
	public convenienceflexibility: any = {};
	public learninggoes: any = {};
	public notchteachers: any = {};
	public languagetraining: any = {};
	public learnfromhome: any = {};
	public learninguroki: any = {};


	conditionalForm: boolean = false;



	constructor(
		private _activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar,
		private sharedService: SharedService,
		private spinner: NgxSpinnerService,
		private _bs: BehaviorService,
		private memberService: TeachersService,
		private router: Router,
		private credentials: CredentialsService,
		private contService: ContentService,
		private ngxNotificationMsgService: NgxNotificationMsgService,
	) { }

	ngOnInit() {
		this._activatedRoute.queryParams.subscribe((params) => {
			this.userID = params.id;
			if (this.userID) {
				this.autoLogin();
			}
		});
		this.getAllMembers();
		this.gethowitworks();
		this.getfindatutor();
		this.getbookalesson();
		this.getstartlearning();
		this.getaffordablelessons();
		this.getconvenienceflexibility();
		this.getlearninggoes();
		this.getlanguagetraining();
		this.gettopnotchteachers();
		this.getverifiedteachers();
		this.getwhylearnuroki();
		this.getlearnfromhome();
		this.getstartlearninguroki();
	
	}

	autoLogin() {
		let data = {
			userId: this.userID,
		};
		this.spinner.show();
		this._loginObservable = this.sharedService.autoLogin(data).subscribe(
			(res) => {
				if (res.success) {
					this.user = res.data;
					localStorage.setItem("user", JSON.stringify(this.user));
					this._bs.setUserData(res.data);
					// this.getUserDetail();
				} else {
					this.snackBar.open(res.error.message, '', {
						duration: 2500,
					});
				}
				this.spinner.hide();
			},
			(error) => {
				this.spinner.hide();
				this.snackBar.open(error, '', {
					duration: 2500,
				});
			}
		);
	}

	getAllMembers() {
		this.spinner.show();
		// this.isLoading = true;
		// if (this.role) {
		//   Object.assign(this.filters, { role: this.role });
		// }
		this._subscriberData = this.memberService.getAllUsers(this.filters).subscribe((response) => {
			if (response.data.length == 0) {
				this.membersData = [];
				this.totalItems = response.total;
				// this.isLoading = false;
				this.spinner.hide();
				this.snackBar.open(response.error.message, '', {
					duration: 2500,
				});
				//   this.ngxNotificationMsgService.open({
				//     status: NgxNotificationStatusMsg.FAILURE,
				//     header: '',
				//     messages: ['No data found!']
				//  });
			} else {
				this.membersData = response.data;
				this.totalItems = response.total;
				// this.isLoading = false;
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

	setPage(e) {
		this.page = e.offset + 1;
		Object.assign(this.filters, { page: this.page });
		// let route = '/companies/companies/' + this.page;
		// this.router.navigate([route]);
		this.getAllMembers();
	}

	searchValue() {
		this.page = 1;
		Object.assign(this.filters, { page: this.page, search: this.filters.search });
		this.getAllMembers();
	}

	clearValue() {
		// this.page = 0;
		this.filters.search = '';
		// Object.assign(this.filters, { page: this.page, search: this.filters.search });
		this.getAllMembers();
	}


	view(id, type) {
		// this.companiesService.actionType.next(type)
		let route = '/users/view/' + id + '/' + this.page + '/' + type;
		this.router.navigate([route]);
	}

	edit(ID) {
		// this.companiesService.actionType.next(type)
		// this.companiesService.activePage.next(this.page)
		let route = '/users/edit/' + ID + '/' + this.page;
		this.router.navigate([route]);
	}



	filterData(value) {
		// this.role = "";
		if (value === "" || value === "all") {
			delete this.filters['role'];
			this.getAllMembers();
		} else {
			// this.role = value
			Object.assign(this.filters, { role: value });
			// this.role = value;  
			this.getAllMembers();
		}

	}

	addFavourite(id) {
		let data = {
			'userId': id
		}
		this.memberService.addFavourite(data).subscribe(res => {
			if (res.success) {
				this.snackBar.open(res.message, '', {
					duration: 2500,
				});
				this.getAllMembers();
			} else {
				this.snackBar.open(res.error.message, '', {
					duration: 2500,
				});
			}
		},
			error => {
				this.snackBar.open(error, '', {
					duration: 2500,
				});
			}
		)
	}


	gethowitworks() {
		this.contentID = "howitworks";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.content = [];

				} else {
					this.content = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}

	getfindatutor() {
		this.contentID = "findatutor";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.tutor = [];

				} else {
					this.tutor = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}

	getbookalesson() {
		this.contentID = "bookalesson";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.lessonbook = [];

				} else {
					this.lessonbook = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getstartlearning() {
		this.contentID = "startlearning";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.startlearning = [];

				} else {
					this.startlearning = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getwhylearnuroki() {
		this.contentID = "whylearnuroki";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.whylearnuroki = [];

				} else {
					this.whylearnuroki = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getverifiedteachers() {
		this.contentID = "verifiedteachers";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.verifiedteacher = [];

				} else {
					this.verifiedteacher = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getaffordablelessons() {
		this.contentID = "affordablelessons";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.affordablelessons = [];

				} else {
					this.affordablelessons = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}

	getconvenienceflexibility() {
		this.contentID = "convenienceflexibility";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.convenienceflexibility = [];

				} else {
					this.convenienceflexibility = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getlearninggoes() {
		this.contentID = "learninggoes";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.learninggoes = [];

				} else {
					this.learninggoes = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	gettopnotchteachers() {
		this.contentID = "top-notchteachers";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.notchteachers = [];

				} else {
					this.notchteachers = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getlanguagetraining() {
		this.contentID = "languagetraining";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.languagetraining = [];

				} else {
					this.languagetraining = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}
	getstartlearninguroki() {
		this.contentID = "startlearninguroki";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.learninguroki = [];

				} else {
					this.learninguroki = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}

	getlearnfromhome() {
		this.contentID = "learnfromhome";

		if (this.contentID) {
			this.conditionalForm = true;
			this.spinner.show();

			this.contService.get(this.contentID).subscribe((res: any) => {
				if (res.data.length == 0) {
					this.learnfromhome = [];

				} else {
					this.learnfromhome = res.data;
					this.spinner.hide();

				}
			},
				error => {
					this.spinner.hide();
					this.ngxNotificationMsgService.open({
						status: NgxNotificationStatusMsg.FAILURE,
						header: '',
						messages: [error]
					});

				});
		} else {
			this.conditionalForm = false;
		}
	}


}
