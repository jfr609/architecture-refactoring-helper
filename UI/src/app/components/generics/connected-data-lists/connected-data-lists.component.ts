import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-connected-data-lists',
  templateUrl: './connected-data-lists.component.html',
  styleUrls: ['./connected-data-lists.component.scss']
})
export class ConnectedDataListsComponent implements OnInit {

  @Input() listTitle1 = "List1";
  @Input() listTitle2 = "List2";
  @Input() listData1: any[] = ['1', '2', '3', '4'];
  @Input() listData2: any[] = ['5', '6'];

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
