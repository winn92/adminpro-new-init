import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/index';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img) { return url + '/usuarios/xyz'; }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/medicos/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medico u hospital');
        url += '/usuarios/xyz';
    }
    return url;
  }

}
