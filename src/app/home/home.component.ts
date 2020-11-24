import { Component, OnInit, SimpleChanges } from '@angular/core';
import {DataService} from '../services/data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide: string[] = []; 
  id="";
  state;
  
  constructor(public dataservice:DataService,private router:Router,private activatedRouter:ActivatedRoute) { 
   
  }
 
  ngOnInit(): void {
    this.getBanner();
    this.getHomeVideos();

  }

  getBanner(){
     this.dataservice.getBanner()
    .subscribe((resp:any)=>{
    
      for(var i=0; i< resp.length; i++) {
        this.slide.push(resp[i].thumbUrl)
      }
    
    })
  }
  allCategorys;
 
  getHomeVideos(){
    this.dataservice.getHomeVideos()
    .subscribe((resp:any)=>{
     this.allCategorys = resp;
   
      })
  }
    url; options; videoPass;
  getId(videoId, catName){   
       this.id =videoId;
       videoId="";
       this.dataservice.toggle=!this.dataservice.toggle
        for(var i = 0; i< this.allCategorys.length; i++) {
          if(this.allCategorys[i].category == catName) {
            this.videoPass = this.allCategorys[i].videos;        
              break;
      }

    }

  }
}