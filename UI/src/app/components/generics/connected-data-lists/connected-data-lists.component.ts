import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

export class ConnectedDataListElement{
  displayName!: string;
  dataElement?: {};
}

@Component({
  selector: 'app-connected-data-lists',
  templateUrl: './connected-data-lists.component.html',
  styleUrls: ['./connected-data-lists.component.scss']
})
export class ConnectedDataListsComponent implements OnInit {

  @Input() listTitle1 = "List1";
  @Input() listTitle2 = "List2";
  @Input() listData1: ConnectedDataListElement[] = [];
  @Input() listData2: ConnectedDataListElement[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
