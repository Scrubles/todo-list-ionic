import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Item } from './../../model/item';
import { BaseProvider } from './../base';

@Injectable()
export class ToDoProvider extends BaseProvider {

  items: AngularFireList<Item>;

  constructor(public db: AngularFireDatabase) {
    super();
    this.setItems();
  }

  private setItems(): void {
    this.items = this.db.list<Item>('/items');
  }

  create(item: Item): void {
    this.items.push(item);
  }

  update(item: Item): Promise<void> {
    const { $key, text, done } = item;
    console.log($key);
    return this.db.object(`/items/${$key}`).update({ text, done }).catch(this.handlePromiseError);
  }

  remove(item: Item): Promise<void> {
    return this.db.object(`/items/${item.$key}`).remove().catch(this.handlePromiseError);
  }
}
