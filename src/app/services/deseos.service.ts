import { Injectable } from '@angular/core';
import { List } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  lists: List[] = [];

  constructor() {
    this.getStorage();
  }

  createList(title: string): number {
    const list = new List(title);
    this.lists.push(list);
    this.saveStorage();
    return list.id;
  }

  readList(idList: string | number): List {
    idList = Number(idList);
    return this.lists.find(list => list.id === idList);
  }

  updateNameList(nameList: string, list: List) {
    list.title = nameList;
    this.saveStorage();
  }

  deleteList(id: number): void {
    this.lists = this.lists.filter(listaData => listaData.id !== id);
    this.saveStorage();
  }

  saveStorage(): void {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  getStorage(): void {
    if (JSON.parse(localStorage.getItem('data'))){
      this.lists = JSON.parse(localStorage.getItem('data'));
    }
  }
}
