import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../../models/lista.model';
import { ListItem } from '../../models/lista-item.models';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    list: List;
    nameItem: string;

    @Input() complete: boolean;

    constructor(private deseosSvc: DeseosService,
                private route: ActivatedRoute) {
        this.nameItem = '';
        const idList = this.route.snapshot.paramMap.get('idList');
        this.list = this.deseosSvc.readList(idList);
    }

    ngOnInit() {
    }

    addItem() {
        if (this.nameItem.length === 0) {
            return;
        }
        const item = new ListItem(this.nameItem);
        this.list.items.push(item);
        this.deseosSvc.saveStorage();
        this.nameItem = '';
    }

    deleteItem(id: number) {
        this.list.items.splice(id, 1);
        this.deseosSvc.saveStorage();
    }

    changeItem(item: ListItem) {
        const complete = this.list.items.filter(itemData => !itemData.complete);
        if (complete.length === 0) {
            this.list.finishedAt = new Date();
            this.list.end = true;
        } else {
            this.list.finishedAt = null;
            this.list.end = false;
        }
        this.deseosSvc.saveStorage();
    }

}
