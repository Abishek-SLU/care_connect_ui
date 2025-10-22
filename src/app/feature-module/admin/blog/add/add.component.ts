import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  blogs : any = [];
	title:any ;
	description:any ;
	type:any ;
	blogDetails:any;
  	id:any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  	this.getBlogs();
  }

  openModal(template: TemplateRef<any>) {
  	this.id = "";
	    this.title = "";
	    this.type = "";
	    this.description = "";
  }

  decline() {
    // this.modalRef.hide();
  }

  editModal(template: TemplateRef<any>,blog:any) {
  	let data = blog;
  	this.blogDetails = blog;
  	this.id = blog['id'];
  	this.title = blog['title'];
  	this.type = blog['type'];
	   this.description = blog['description'];
  
    
  }

  deleteModal(template: TemplateRef<any>,blog:any) {
  }

  deleteBlog() {
  	this.commonService.deleteBlog(this.id).subscribe((data : any)=>{      
      // this.modalRef.hide();
      this.getBlogs();
    })
  }

  update() {
  	let params = {
      	id : this.id,
	    title : this.blogDetails.title,
	    description : this.blogDetails.description,
	    createdBy : "Dr. Deborah Angel",
	    createdAt : new Date(),
	    comments : 0,
	    type : this.type,
	    status : "active"
    }
    this.commonService.updateBlog(params,this.id).subscribe((data : any)=>{
      	this.getBlogs();	
        // this.modalRef.hide();
        
    })
  }

  save() {
  	let params = {
  		id : this.blogs.length+1,
	    title : this.title,
	    description : this.description,
	    createdBy : "Dr. Deborah Angel",
	    createdAt : new Date(),
	    comments : "",
	    type : this.type,
	    status : "active"
  	}
  	this.commonService.createBlogs(params).subscribe((data : any)=>{
      // this.modalRef.hide();
      this.getBlogs();
    })
  }

    getBlogs() {
	  	this.commonService.getBlogs()
	  		.subscribe(res=>{
	  			this.blogs = res;
	  		})
    }

}
