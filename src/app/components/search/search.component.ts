import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
              private _lightBox: Lightbox,
              private service: PhotoService,
              private _lightboxEvent: LightboxEvent) { }

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
    })

  }

  /**
   * open
   */
  public open(index: number) {
    this._lightBox.open(this._Album,index, { wrapAround: true, showImageNumberLabel: true })
    this._subscription = this._lightboxEvent.lightboxEvent$
    .subscribe(event => this._onReceivedEvent(event));
}

private _onReceivedEvent(event: any): void {
  // remember to unsubscribe the event when lightbox is closed
  if (event.id === LIGHTBOX_EVENT.CLOSE) {
    // event CLOSED is fired
    this._subscription.unsubscribe();
  }
}
  
}
