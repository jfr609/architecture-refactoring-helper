import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { TOOLTIP_HIDE_DELAY, TOOLTIP_SHOW_DELAY } from '../../../app.constants';

export class ConnectedDataListElement {
  displayName!: string;
  dataElement?: any;
}

@Component({
  selector: 'app-connected-data-lists',
  templateUrl: './connected-data-lists.component.html',
  styleUrls: ['./connected-data-lists.component.scss']
})
export class ConnectedDataListsComponent {
  @Input() sourceDataListTitle = 'Source List';
  @Input() targetDataListTitle = 'Target List';
  @Input() sourceDataList: ConnectedDataListElement[] = [];
  @Input() targetDataList: ConnectedDataListElement[] = [];
  @Input() attributeCreationActive = false;
  @Input() attributeDeletionActive = false;

  @Output() createAttribute: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteAttribute: EventEmitter<void> = new EventEmitter<void>();

  readonly TOOLTIP_SHOW_DELAY = TOOLTIP_SHOW_DELAY;
  readonly TOOLTIP_HIDE_DELAY = TOOLTIP_HIDE_DELAY;
  readonly noDescriptionText = 'No description';

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
