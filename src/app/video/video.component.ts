import { Component, OnInit ,Input, SimpleChanges, OnDestroy, ElementRef, ViewChild, OnChanges, AfterViewInit, ViewEncapsulation, DoCheck} from '@angular/core';
import { DataService } from '../services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnChanges,  OnDestroy {
  @Input() id; playStatus; playText;
  // @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  
  player: videojs.Player;
  @Input() videoArray:any[];
  urlVideohls; urlVideoOrg; urlPoster;
  details:[];
  cast:[];
  test: string[] = []; 
  year;
  constructor(private dataservice:DataService, private nativeElement: ElementRef) {
    window.scrollTo(0, 0);
   }

  ngOnInit() {
    this.playStatus = true;
    this.playText = 'Play';
    for(var i=0; i< this.videoArray.length; i++) { 
      this.test.push(this.videoArray[i].thumbUrl);
    }
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
      this.getIdFunction(this.id);  
      this.dataservice.toggleWithId = this.id;
  }

  ngAfterViewInit() {
    var videoPl = videojs('vjs-player');
    
    document.querySelector('video').addEventListener('play',  evt => { 
               this.playStatus = false;
               this.playText = 'Pause';          
      
   }); 
    document.querySelector('video').addEventListener('pause', ev => {
            this.playStatus = true;
            this.playText = 'Play';
    })

  }
  
  getIdFunction(idFromCarousel){
      this.id=idFromCarousel;
      idFromCarousel = " "; 
      this.dataservice.getDetails(this.id)
      .subscribe((resp:any)=>{
      
      this.urlVideohls = resp.data[0]['videoUrl'].hls;
      this.urlVideoOrg = resp.data[0]['videoUrl'].original;
     
      this.urlPoster = resp.data[0]['videoBgUrl'];
      this.details=resp.data[0];
 
      this.cast=resp.data[0]['castCrew']; 
      this.year=resp.data[0]['releaseDate'].split('-').slice(0,1)
        this.playVideo();   
        window.scrollTo(0, 0);
    })     
    
  }


  playVideoBtn() {
    var videoObj = videojs('vjs-player');
      if (!videoObj.paused()) {
          
          videoObj.pause();
      } else {
         
          videoObj.play();
      }}
     
    
  getId(idFromCarousel){
    this.id=idFromCarousel;
    this.getIdFunction(this.id);
  }
  playVideo() {

    var myPlayer = videojs('vjs-player');
    myPlayer.src([{
      type: 'application/x-mpegURL',
      src: this.urlVideohls
    },     
    {
      type:'video/mp4',
      src: this.urlVideoOrg
    }]);
    myPlayer.poster(this.urlPoster);
  }
  
  ngOnDestroy() {
    this.id = ""; 
    this.videoArray = [];
    var myPlayer = videojs('vjs-player');
    myPlayer.dispose();
  
  }
}