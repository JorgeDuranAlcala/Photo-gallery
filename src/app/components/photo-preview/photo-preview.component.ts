import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute, Router } from "@angular/router";
import { IPhoto } from 'src/app/interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent implements OnInit {

  photoToEdit: IPhoto;

  constructor(private service: PhotoService,
             private activatedRoute: ActivatedRoute,
             private router: Router
             ) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe( parms => 
        this.service.getPhoto(parms.id)
        .subscribe( res => {
          this.photoToEdit = res
        }, err => console.log(err))
      )
  }

  deletePhoto() {
    this.activatedRoute.params.subscribe( params => {
        this.service.deletePhoto(params.id)
        .subscribe( res => {
            this.router.navigate(['/home'])
        }, error => console.log(error))
    })
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
      this.activatedRoute.params.subscribe( parms => {
        this.service.updatePhoto(parms.id, title.value, description.value)
        .subscribe( res => {
          this.router.navigate(['/home'])
        }, error => console.log(error))
      })
      return false
  }

}
