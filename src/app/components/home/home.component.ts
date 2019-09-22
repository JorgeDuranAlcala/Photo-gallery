import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { IPhoto } from 'src/app/interfaces/Photo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photoList: IPhoto;

  constructor(private service: PhotoService, private router: Router) { }

  ngOnInit() {
      this.service.allPhotos()
      .subscribe( 
        r => {
          this.photoList = r
          console.log(this.photoList) 
        }
         ,
        error => console.log(error)
        )
  }

  photoPreview(id: string): Promise<boolean> {
      return this.router.navigate([`/previewPhoto/${id}`])
  }

}
