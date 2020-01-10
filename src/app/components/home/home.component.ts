import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { IPhoto } from 'src/app/interfaces/Photo';
import { Router } from '@angular/router';
import * as sal from "sal.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photos: IPhoto[];

  constructor(private service: PhotoService,) { }

  ngOnInit() {
    sal({
      threshold: 0.2,
      once: false
    })

    this.service.allPhotos()
    .subscribe( r => {
      this.photos = r
      console.log(this.photos);
    })
    
  }


  

}
