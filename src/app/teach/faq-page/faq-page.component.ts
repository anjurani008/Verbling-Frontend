import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {

  faqData:Array<any>=[]

  faqda: any;
  collection = [];
  panelOpenState = false;

  totalItems=0
  page = 1;
  isDeleted = false
  p:any;
  filters: { page: number; search: string,count:number, isDeleted: boolean, status:string } = { page: 1, search: '', count:100,isDeleted: false,status:'active'  };
  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    // private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public pageService: SharedService,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }

  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});

    this.getFaqs();
  }


  getFaqs() {
    // this.spinner.show();
    // if (isDeleted) {
    //   this.isDeleted = isDeleted
    //   Object.assign(this.filters, { isDeleted: isDeleted });
    // }
    this.pageService.getAllFaqs(this.filters).subscribe((res) => {
      if (res.success) {
        this.faqData = [];  

        this.faqData = res.data
        this.faqData.forEach(x=>{
          x['isCollapsed'] = true;
        })
        
      } else {
        // this.totalItems = res.total
        this.faqData = res.data.map(cat => {


          return {
            id: cat.id,
            question: cat.question,
            answer: cat.answer,
            status: cat.status,
            createdAt: cat.createdAt
          }
        });
        
      } 
      this.spinner.hide();
    });
  }

}
