import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css']
})
export class BlogGridComponent implements OnInit {
  blogs: any = [];
  errorMessage!: string;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.getBlogs();
    window.scrollTo(0, 0);
  }

  getBlogs() {
    this.commonService.getBlogs()
      .subscribe(
        {
          next:(res:any)=>{
            this.blogs = res;
          },
          error:(err:any)=>{
            this.errorMessage = <any>err;
          }
        } 
      )
  }
}
