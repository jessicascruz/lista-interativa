import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Character {
  name: string;
  image: string;
  // fatality: string;
 }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listaInterativa';

  public myList: Character[];
  public confirmList: Character[] = [];

  constructor(private httpClient: HttpClient) {
    this.getMyList();
  }

  public getMyList() {
    this.httpClient.get<Character[]>('assets/data.json')
    .subscribe(list => {
     this.myList = list;
    });
  }

 public drop(event: CdkDragDrop<Character[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    }
 }

}
