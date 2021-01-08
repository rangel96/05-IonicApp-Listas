import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { List } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  lists: List[];

  constructor(private deseosService: DeseosService,
              private router: Router) {
    this.lists = deseosService.lists;
  }

  updateList(idList: number) {
    this.router.navigate(['/tabs/add', idList]);
  }

}
