import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { HtmlInputEvent } from "../../interfaces/inputEvent";

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  file: File
  photoSelected: string | ArrayBuffer;
 
  constructor(private service: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent ): void {
     
    if(event.target.files && event.target.files[0]) {
        this.file = event.target.files[0]
        // IMAGE PREVIEW
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result
        reader.readAsDataURL(this.file)
    }

  }

  onSubmit(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
      this.service.addPhoto(title.value, description.value, this.file)
      .subscribe( r => {
        console.log(r)
        this.router.navigate(['/photos'])
      },
      error => console.log(error))
      return false
  }

}
