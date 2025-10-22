import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites:any = [];
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
  	this.getFavourites();
  }

  getFavourites() {
  	this.commonService.getFav()
  		.subscribe(res=>{
        this.favourites = res;
  		})
  }

  unfav(fav:any) {
    this.commonService.deleteFav(fav.id)
      .subscribe(res=>{
          this.getFavourites();
      })
  }
}
