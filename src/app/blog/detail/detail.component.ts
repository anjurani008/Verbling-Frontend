import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsManagementService } from "../blogs-management.service";
import { NgxSpinnerService } from "ngx-spinner";
import {
  NgxNotificationMsgService,
  NgxNotificationStatusMsg,
} from "ngx-notification-msg";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public blogID: any;
  blog: any;
  Newblog: any[];
  Trendingblogs: any[];

  totalItems: any;
  filtersNew: { page: number; count: number; search: string; categoryType: string } = { page: 1, count: 2, search: '', categoryType: 'New' };
  filtersTrending: { page: number; count: number; search: string; categoryType: string } = { page: 1, count: 2, search: '', categoryType: 'Trending' };

  public _host = environment.url;
  constructor(private _activateRouter: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private blogsManagementService: BlogsManagementService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,) { }

  ngOnInit(): void {
    this.blogID = this._activateRouter.snapshot.params["id"];

    if (this.blogID) {

      this.spinner.show();
      this.blogsManagementService.get(this.blogID).subscribe(
        (res: any) => {
          if (res.success) {
            this.blog = res.data;
            console.log("this.blog", this.blog);
          } else {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.FAILURE,
              header: "",
              messages: [res.error.message],
            });
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.ngxNotificationMsgService.open({
            status: NgxNotificationStatusMsg.FAILURE,
            header: "",
            messages: [error],
          });
        }
      );
    }
    this.getTrendingblogs();
    this.getNewblog();

  }

  getTrendingblogs() {

    this.spinner.show();

    this.blogsManagementService.getAllBlogs(this.filtersTrending)
      .subscribe((response) => {
        if (response.data.length == 0) {
          this.Trendingblogs = [];
          this.totalItems = response.total;
        } else {
          this.totalItems = response.total;
          this.Trendingblogs = response.data.map((cat) => {
            return {
              id: cat._id,
              title: cat.title,
              image: cat.image,
              description: cat.description,
              status: cat.status,
              deletedBy: cat.deletedBy,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
              categoryType: cat.categoryType,
            };
          });
        }


        this.spinner.hide();
      });
  }
  getNewblog() {

    this.spinner.show();

    this.blogsManagementService.getAllBlogs(this.filtersNew)
      .subscribe((response) => {
        if (response.data.length == 0) {
          this.Newblog = [];
          this.totalItems = response.total;
        } else {
          this.totalItems = response.total;
          this.Newblog = response.data.map((cat) => {
            return {
              id: cat._id,
              title: cat.title,
              image: cat.image,
              description: cat.description,
              status: cat.status,
              deletedBy: cat.deletedBy,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
              categoryType: cat.categoryType,
            };
          });
        }


        this.spinner.hide();
      });
  }
  blogdetail(id) {
    this.spinner.show;
    let route = '/blog/detail/' + id
   
    this. router.navigate([route])
      .then(() => {
        window.location.reload();
      });
      this.spinner.hide();
    // this.getTrendingblogs();
    // this.getNewblog();

  }

}
