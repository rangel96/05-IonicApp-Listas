import { Component, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor(private deseosService: DeseosService,
                private router: Router,
                private alertCtrl: AlertController) {
    }

    async addList() {
        const alert = await this.alertCtrl.create({
            header: 'New List',
            inputs: [{
                name: 'title',
                type: 'text',
                placeholder: 'Name list'
            }],
            buttons: [
                {
                    text: 'Add',
                    handler: (data) => {
                        // Validar data
                        if (data.title.length === 0) {
                            return;
                        }
                        // Crear la lista
                        const idList = this.deseosService.createList(data.title);
                        // Redireccionar
                        this.router.navigate(['/tabs/tab1/addItems', idList]);
                    }
                },
                {
                    text: 'Cancel',
                    role: '',
                    handler: () => console.log('Cancel'),
                }],
        });
        await alert.present();
    }
}
