import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/interfaces/Photo';
import { HttpErrorResponse } from '@angular/common/http';
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photoList: any;
  Album: IAlbum[] = [];

  constructor(public service: PhotoService,
              private router: Router,
              private _lightbox: Lightbox) { }

  ngOnInit() {
    this.service.getPhotoUser()
      .subscribe( 
        r => {
          this.photoList = r;

         this.photoList.forEach( photo => {
            const src = `http://localhost:3100/${photo.imagePath}`;
            const caption =`${photo.title}<br>${photo.description}`;
            const thumb = `${src}`;

            const album ={
                src,
                caption,
                thumb
            }

            this.Album.push(album)
            
          })
          this.service.cargando = false;
          
        }
         ,
        error => {
          if(error instanceof HttpErrorResponse) {
            if(error.status === 401) {
              this.router.navigate(['logIn'])
            }
          }
        }
        )
  }

photoPreview(id: string): Promise<boolean> {
    return this.router.navigate([`/previewPhoto/${id}`])
}

 public open(index: number):void {
      this._lightbox.open(this.Album, index, { wrapAround: true })
 }
}
