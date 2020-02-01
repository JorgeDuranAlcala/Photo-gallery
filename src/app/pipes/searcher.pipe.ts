import { Pipe, PipeTransform } from '@angular/core';
import { IAlbum } from 'ngx-lightbox';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from '../interfaces/Photo';

@Pipe({
  name: 'searcher'
})
export class SearcherPipe implements PipeTransform {


  transform(value: IPhoto[], args: string): any {

        let filteredPhotos = [];
        value.filter(photo => {
          args = args.substring(1, args.length);
          
          if(photo.title.includes(args.toLocaleLowerCase())) {
            filteredPhotos.push(photo)
          } 
          
        })
        
        return filteredPhotos

  }

}
