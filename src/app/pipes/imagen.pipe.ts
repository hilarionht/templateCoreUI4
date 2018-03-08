import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario' ): any {
    let url = URL_SERVICIOS + '/img';

    if( !img ){
      return url + '/usuario/xxx'
    }
    if( img.indexOf('hpps') >= 0 ) {
      return img;

    }
    if( img.indexOf('hpp') >= 0 ) {
      return img;

    }
    switch  ( tipo ) {
        case 'usuario':  url += '/usuario/' + img; break;
        case 'hospital': url += '/hospital/' + img; break;
        case 'medico':   url += '/medico/' + img; break;
        default: 
          return url + '/usuario/xxx';
    }
    return url;
  }

}
