import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/interfaces/Photo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photoList: IPhoto;  

  constructor(private service: PhotoService,
              private router: Router) { }

  ngOnInit() {
    this.service.allPhotos()
      .subscribe( 
        r => {
        this.photoList = r
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

}
