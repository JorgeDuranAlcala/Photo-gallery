import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { IPhoto } from '../interfaces/Photo';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  url: string = `http://localhost:3100/api/photos`;
  cargando: boolean = true;

  constructor(private http: HttpClient) {
   }

   addPhoto(title: string, description: string, image: File) {
     const fd = new FormData();
     fd.append('title', title)
     fd.append('description', description)
     fd.append('image', image)
     return this.http.post<IPhoto>(this.url, fd)
   }

   allPhotos() {
     return this.http.get<IPhoto[]>(this.url)
   }

   getPhoto(id: string) {
     return this.http.get<IPhoto>(`${this.url}/${id}`)
   }

   updatePhoto(id: string, title: string, description: string, image: File) {
      const fd = new FormData()
      fd.append('title', title)
      fd.append('description', description)
      fd.append('image', image)

      return this.http.put<IPhoto>(`${this.url}/${id}`, fd)
   }

   deletePhoto(id: string) {
      return this.http.delete<IPhoto>(`${this.url}/${id}`)
   }
}
