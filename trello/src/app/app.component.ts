import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { DialogComponent } from './dialog/dialog.component';
import { DataServiceService } from './shared/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trello';
  trelloLists: Trello[] = [{
    title: 'teams',
    products: [
      {
        name: 'product',
        description: 'Three pending task to be picked by Raj.'
      },
      {
        name: 'sales',
        description: 'Send proposal to puneet for sale prices.'
      }
    ]
  }, {
    title: 'products',
    products: [
      {
        name: 'unit testing',
        description: 'Ask Eng to set up testing infra.'
      },
    ]
  }];
  constructor(
    private dialog: MatDialog,
    private ds: DataServiceService
  ) {
  }
  ngOnInit() {
    // this.ds.clearStorage();
    const storedTrelloList = this.ds.getTrelloList();
    if (storedTrelloList && storedTrelloList.length) {
      this.trelloLists = storedTrelloList;
    }
  }
  addTrelloList() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: { label: 'Add List', data: null }
    })
    dialogRef.afterClosed().subscribe((formData: any) => {
      const FormObj = formData.value;
      this.trelloLists.push({title: FormObj.title, products: []});
      this.storeList();
    });
  }
  removeTrelloList(title: string) {
    this.trelloLists = this.trelloLists.filter((_list) => _list.title.toLowerCase() !== title.toLowerCase());
    this.storeList();
  }
  addCard(title: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: { label: 'Add Card', data: null }
    })
    dialogRef.afterClosed().subscribe((formData: any) => {
      let FormObj = formData.value;
      FormObj.createdDate = new Date();
      this.trelloLists.map((_list: Trello) => {
        if (_list.title.toLowerCase() === title.toLowerCase()) {
          _list['products'].push(FormObj);
        }
      });
      this.storeList();
    });
  }
  removeCard(listTitle: string, product: Products) {
    this.trelloLists.map((_list: Trello) => {
      if (_list.title.toLowerCase() === listTitle.toLowerCase()) {
        _list['products'] = _list['products'].filter((_product) => _product.createdDate !== product.createdDate);
      }
    });
    this.storeList();
  }
  storeList() {
    this.ds.storeTrelloList(this.trelloLists);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.storeList();
  }
}
export interface Trello {
  title: string;
  products?: Products[];
}
export interface Products {
  name: string;
  description: string;
  createdDate?: Date;
}