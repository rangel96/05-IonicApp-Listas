import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/lista.model';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(lists: List[], complete: boolean = true): List[] {
    lists = lists.filter((listaData: List) => listaData.end === complete);
    return lists;
  }

}
