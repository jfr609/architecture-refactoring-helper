import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogData } from '../utils/models/dialog-data';
import { ConnectedDataListElement } from '../components/generics/connected-data-lists/connected-data-lists.component';
import { copy, findArrayDifference } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  timeOut = 3000;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  public createDialog(
    dialogComponent: ComponentType<any>,
    data: DialogData,
    width?: string,
    height?: string
  ): MatDialogRef<any> {
    return this.dialog.open(dialogComponent, {
      width: width || '400px',
      height: height || undefined,
      data
    });
  }

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', {
      duration: this.timeOut
    });
  }

  public createConnectedDataList<T>(
    list: T[],
    getDisplayName: (e: T) => string | null | undefined
  ): ConnectedDataListElement[] {
    let connectedDataList: ConnectedDataListElement[] = [];
    for (const element of list) {
      let displayName = getDisplayName(element);
      if (displayName == null) {
        displayName = 'Unknown display name!';
      }
      let dataListElement: ConnectedDataListElement = {
        displayName: displayName,
        dataElement: element
      };
      connectedDataList.push(dataListElement);
    }
    return connectedDataList;
  }

  public fillConnectedDataLists<T>(
    isCreateView: boolean,
    approachElements: T[] | null | undefined,
    allElements: T[],
    sourceDataList: ConnectedDataListElement[],
    targetDataList: ConnectedDataListElement[],
    elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b,
    getDisplayName: (e: T) => string | null | undefined
  ): void {
    if (!isCreateView && approachElements != null) {
      let allElementsCopy: T[] = copy(allElements);
      let difference = findArrayDifference(
        allElementsCopy,
        approachElements,
        elementsEqual
      );

      if (difference.length !== 0) {
        sourceDataList.push(
          ...this.createConnectedDataList<T>(difference, getDisplayName)
        );
      }
      targetDataList.push(
        ...this.createConnectedDataList<T>(approachElements, getDisplayName)
      );
    } else {
      sourceDataList.push(
        ...this.createConnectedDataList<T>(allElements, getDisplayName)
      );
    }
  }
}
