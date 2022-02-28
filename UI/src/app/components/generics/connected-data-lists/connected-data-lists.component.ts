import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

export class ConnectedDataListElement {
  displayName!: string;
  dataElement?: {};
}

@Component({
  selector: 'app-connected-data-lists',
  templateUrl: './connected-data-lists.component.html',
  styleUrls: ['./connected-data-lists.component.scss']
})
export class ConnectedDataListsComponent implements OnInit {
  @Input() sourceDataListTitle = 'Source List';
  @Input() targetDataListTitle = 'Target List';
  @Input() sourceDataList: ConnectedDataListElement[] = [];
  @Input() targetDataList: ConnectedDataListElement[] = [];
  @Input() attributeCreationActive: boolean = false;
  @Input() attributeDeletionActive: boolean = false;

  @Output() onCreateAttribute: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteAttribute: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onAddAttributeClicked() {
    this.onCreateAttribute.emit();
  }

  onDeleteAttributeClicked() {
    this.onDeleteAttribute.emit();
  }
}
