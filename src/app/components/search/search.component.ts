import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lightbox, IAlbum, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { PhotoService } from "../../services/photo.service";
import { IPhoto } from 'src/app/interfaces/Photo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  _subscription: Subscription;
  text: string;
  photos: IPhoto[];
  _Album: IAlbum[] = [];
  condition: boolean;
  reveal: boolean = true;
  src: string;
  caption: string;
  photoIsEmpty: boolean;
  @ViewChild('photoPreview', {static:false}) photoPreview: ElementRef;

  constructor(private route: ActivatedRoute,
              private _lightBox: Lightbox,
              private service: PhotoService,
              private _lightboxEvent: LightboxEvent,
              private renderer2: Renderer2,
              ) { }

  ngOnInit() {

    this.route.params
    .subscribe(parms => {
      this.text = parms['text'];
      
      let str = this.text.substring(1, this.text.length);
      if(str === '') {
          this.condition = true;
      } else { this.condition = false }
    })

    this.service.allPhotos()
    .subscribe( r => {
      this.photos = r
      this.photoIsEmpty = !!this.photos.length;
      })

  }

  /**
   * open
   */
  public open(src: string, title: string, desc: string) {
       this.src = src;
       this.caption = `${title}, ${desc}`
       this.reveal = false;
    }

  /**
   * close
   */
  public close() {
    this.reveal = true;
  }

  
}
