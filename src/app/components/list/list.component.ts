import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { List } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

    @Input() complete;
    @ViewChild(IonList) list: IonList;

    constructor(public deseosService: DeseosService,
                private router: Router,
                private alertCtrl: AlertController) {
    }

    ngOnInit(): void {
    }

    async updateNameList(list: List) {
        const alert = await this.alertCtrl.create({
            header: 'Update name list',
            message: 'Escribe el titulo de la lista',
            inputs: [{
                name: 'name',
                type: 'text',
                placeholder: 'Name',
                value: `${list.title}`
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: '',
                    handler: () => this.list.closeSlidingItems(),
                },
                {
                    text: 'Update',
                    handler: (data) => {
                        // Validar data
                        if (data.name.length === 0) {
                            return;
                        }
                        // Nuevo titulo de la lista
                        this.deseosService.updateNameList(data.name, list);
                        this.list.closeSlidingItems();
                    }
                },
            ],
        });
        await alert.present();
    }

    async selectList(idList: number) {
        const alert = await this.alertCtrl.create({
            header: 'Delete list',
            message: `Escribe el siguiente numero: ${idList}`,
            inputs: [{
                name: 'id',
                type: 'text',
                placeholder: 'Numero'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: '',
                    handler: () => this.list.closeSlidingItems(),
                },
                {
                    text: 'Delete',
                    handler: (data) => {
                        data = Number(data.id);
                        // Validar data
                        if (data !== idList) {
                            console.log('No se pudo borrar');
                            return;
                        }
                        console.log('Lista borrada');
                        // Eliminar lista
                        this.deleteItem(idList);
                    }
                },
                ],
        });
        await alert.present();
    }

    deleteItem(id: number) {
        this.deseosService.deleteList(id);
    }
}
