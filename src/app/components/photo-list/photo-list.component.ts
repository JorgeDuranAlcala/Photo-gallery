import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/interfaces/Photo';
import { HttpErrorResponse } from '@angular/common/http';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { UserService } from 'src/app/services/user.service';
import { IProfile } from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photoList: any;
  Album: IAlbum[] = [];
  albumIsEmpty: boolean;
  currentUser: IProfile;

  constructor(public service: PhotoService,
              private userService: UserService,
              private router: Router,
              private _lightbox: Lightbox,) { }

  ngOnInit() {

    /* get User profile */

    this.userService.getProfile()
    .subscribe( (r: IProfile) => {
        this.currentUser = r;
    })

    /* get all photos of the user */

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


          // cargando...

          this.service.cargando = false;
          
          // check if there's photos

          this.albumIsEmpty = !!this.Album.length;
          
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
      

public photoPreview(id: string): Promise<boolean> {
    return this.router.navigate([`/previewPhoto/${id}`])
}

public deletePhoto(id: string): void{
    this.service.deletePhoto(id)
    .subscribe(r => {
      console.log(r)
      this.router.navigate(['/photos'])
    }, error => console.log(error))
} 


 public open(index: number):void {
      this._lightbox.open(this.Album, index, { wrapAround: true })
 }
}
