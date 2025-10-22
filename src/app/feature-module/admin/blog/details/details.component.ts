import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id:any;
  blogdetails: any = [];
  blogs: any = [];
  comments: any = [];
  name = '';
  email = '';
  usercomment = '';
  constructor(
    private toastr: ToastrService,
    public commonService: CommonService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.getBlogdetails();
    this.getBlogs();
    this.getComments();
    window.scrollTo(0, 0);
  }

  getBlogdetails() {
    this.commonService.getBlogsDetails(1).subscribe((res) => {
      this.blogdetails = res;
    });
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((result) => {
      this.blogs = result;
    });
  }

  getComments() {
    this.commonService.getComments().subscribe((result) => {
      this.comments = result;
    });
  }

  navigate(blog:any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/blog-details?id=' + blog.id);
    });
  }

  comment() {
    if (this.name === '' || this.email === '' || this.usercomment === '') {
      this.toastr.error('', 'Please enter mandatory field');
    } else {
      let params = {
        id: this.comments.length + 1,
        name: this.name,
        email: this.email,
        comment: this.usercomment,
      };
      this.commonService.createComment(params).subscribe((res) => {
        this.toastr.success('', 'Comment successfully!');
        this.name = '';
        this.email = '';
        this.usercomment = '';
        this.getComments();
      });
    }
  }
}
