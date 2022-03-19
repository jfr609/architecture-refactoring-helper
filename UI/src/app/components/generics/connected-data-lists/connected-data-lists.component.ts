import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

export class ConnectedDataListElement {
  displayName!: string;
  dataElement?: any;
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
  @Input() attributeCreationActive = false;
  @Input() attributeDeletionActive = false;

  @Output() createAttribute: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteAttribute: EventEmitter<void> = new EventEmitter<void>();

  get noDescriptionText(): string {
    return 'No description';
  }

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
    this.createAttribute.emit();
  }

  onDeleteAttributeClicked() {
    this.deleteAttribute.emit();
  }
}
