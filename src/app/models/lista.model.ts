import { ListItem } from './lista-item.models';

export class List {
    id: number;
    title: string;
    createdAt: Date;
    finishedAt: Date;
    end: boolean;
    items: ListItem[];


    constructor(title: string) {
        this.id = new Date().getTime();
        this.title = title;
        this.createdAt = new Date();
        this.end = false;
        this.items = [];
    }
}
