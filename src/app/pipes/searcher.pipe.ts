import { Pipe, PipeTransform } from '@angular/core';
import { IAlbum } from 'ngx-lightbox';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'searcher'
})
export class SearcherPipe implements PipeTransform {


  transform(value: IAlbum[], args: string): any {

        let filteredPhotos = [];

        value.filter(photo => {
          args = args.substring(1, args.length);

          if(photo.caption.includes(args.toLocaleLowerCase())) {
              filteredPhotos.push(photo)
          } 

          filteredPhotos.push()
          
        })
        
        return filteredPhotos

  }

}
