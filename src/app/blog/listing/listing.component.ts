import { Component, OnInit } from "@angular/core";
import { BlogsManagementService } from "../blogs-management.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  blogData: any[];
  totalItems: any;
  page = 1;
  filters: { page: number; count: number; search: string; isDeleted: boolean; categoryType: string } = { page: 1, count: 5, search: '',isDeleted: false, categoryType: '' };
  
  public _host = environment.url;
  constructor(private blogsManagementService: BlogsManagementService,
    private spinner: NgxSpinnerService,
    private router: Router) { }


  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.getBlogs();

  }
  searchValue() {
    this.page = 1;
    Object.assign(this.filters, { page: this.page, search: this.filters.search, categoryType: this.filters.categoryType });
    this.getBlogs();
  }

  clearValue() {
    this.page = 1;
    this.filters.search = '';
    Object.assign(this.filters, { page: this.page, search: this.filters.search, categoryType: this.filters.categoryType });
    this.getBlogs();
  }
  blogdetail(id) {
    // this.userService.actionType.next(type)
    let route = '/blog/detail/' + id
    this.router.navigate([route]);
  }
  changeBlogs(key) {
    this.filters.categoryType = key;
    Object.assign(this.filters, { page: this.page, search: this.filters.search, categoryType: this.filters.categoryType });
    this.getBlogs();
  }


  getTab(item) {
    console.log('item',item);
    this.filters.categoryType = item;
    this.getBlogs();
  }

  getBlogs() {

    this.spinner.show();

    this.blogsManagementService.getAllBlogs(this.filters)
      .subscribe((response) => {
        if (response.data.length == 0) {
          this.blogData = [];
          this.totalItems = response.total;
        } else {
          this.totalItems = response.total;
          this.blogData = response.data.map((cat) => {
            return {
              id: cat._id,
              title: cat.title,
              image: cat.image,
              description: cat.description,
              status: cat.status,
              deletedBy: cat.deletedBy,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
              categoryType:cat.categoryType,
            };
          });
        }
        console.log(this.blogData, "this.blogData");

        this.spinner.hide();
      });
  }
}
