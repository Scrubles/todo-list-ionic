import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';

import { Item } from './../../model/item';
import { ToDoProvider } from './../../providers/to-do/to-do';

@Component({
  selector: 'to-do-list',
  templateUrl: 'to-do-list.html'
})
export class ToDoListPage {

  searchText: string = '';
  situation: string = 'todo';
  items: Item[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public toDoProvider: ToDoProvider) {

  }

  ionViewWillLoad() {
    this.toDoProvider.items.snapshotChanges().map((actions: any) => {
      const data = []
      actions.map((action: any) => {
        const $key = action.key;
        data.push({ $key, ...action.payload.val() })
      });
      return data;
    }).subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  filterAndSort(items: Item[]): Item[] {
    return items
      .filter((item) => item.text.toUpperCase().indexOf(this.searchText.toUpperCase()) !== -1)
      .filter((item) => this.situation === 'todo' ? !item.done : item.done)
      .sort((i1, i2) => i1.text.toUpperCase().localeCompare(i2.text.toUpperCase()));
  }

  openForm(item?: Item, slidingItem?: ItemSliding) {
    this.alertCtrl.create({
      title: 'Item',
      inputs: [
        {
          name: 'text',
          placeholder: 'Name',
          value: item ? item.text : ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (!data.text)
              return false;

            if (item)
              this.edit({ ...item, text: data.text });
            else
              this.add(data.text);

            if (slidingItem)
              slidingItem.close();
          }
        }
      ]
    }).present();
  }

  add(text: string): void {
    this.toDoProvider.create(new Item(text));
  }

  edit(item: Item): void {
    this.toDoProvider.update(item);
  }

  toggleDone(item: Item, slidingItem: ItemSliding): void {
    slidingItem.close();
    this.edit({ ...item, done: !item.done });
  }

  confirmDelete(item: Item): void {
    this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete(item);
          }
        }
      ]
    }).present();
  }

  delete(item: Item): void {
    this.toDoProvider.remove(item);
  }
}
