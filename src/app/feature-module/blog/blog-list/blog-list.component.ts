import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: any = [];
  firstBlock: any = [];
  blog = true;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.getBlogs();
    this.getBlogdetails();
    window.scrollTo(0, 0);
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((result) => {
      this.blogs = result;
      console.log(this.blogs)
    });
  }

  getBlogdetails() {
    this.commonService.getBlogsDetails(1).subscribe((res) => {
      this.firstBlock = res;
    });
  }
}
