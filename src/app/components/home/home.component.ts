import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { IPhoto } from 'src/app/interfaces/Photo';
import { Router } from '@angular/router';
import * as sal from "sal.js";
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photos: IPhoto[];
  _Album: IAlbum[] = [];
  searchText: string = "";

  constructor(private service: PhotoService,
              private _lightBox: Lightbox,
              private route: Router) {
          
      }

  ngOnInit() {
    sal({
      threshold: 0.2,
      once: false
    })

    this.service.allPhotos()
    .subscribe( r => {
      this.photos = r
        
      this.photos.forEach((value, index) => {
  
        const src = `http://localhost:3100/${value.imagePath}`;
        const caption =`${value.title}<br>${value.description}`;
        const thumb = `${src}`;
  
        const album = {
              src,
              caption,
              thumb
          }
          this._Album.push(album)
      })
      console.log(this._Album);
    })

    
    
  }


  public searchPhoto(input: HTMLInputElement) 
  {
    console.log(input.value);
    this.route.navigate([`/search/:${input.value}`])
  }
  
  
  /**
   * open
   */
  public open(index: number) {
      this._lightBox.open(this._Album,index, { wrapAround: true, showImageNumberLabel: true })
  }
  

}
