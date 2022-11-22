import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogData } from '../utils/models/dialog-data';
import { ConnectedDataListElement } from '../components/generics/connected-data-lists/connected-data-lists.component';
import { copy, findArrayDifference } from '../utils/utils';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private snackbarTimeOut = 3000;
  private sidenav!: MatSidenav;
  private scenarioBased = false;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  public createDialog(
    dialogComponent: ComponentType<unknown>,
    data: DialogData,
    width?: string,
    height?: string
  ): MatDialogRef<unknown> {
    return this.dialog.open(dialogComponent, {
      width: width || '400px',
      height: height || undefined,
      data
    });
  }

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', {
      duration: this.snackbarTimeOut
    });
  }

  public createConnectedDataList<T>(
    list: T[],
    getDisplayName: (e: T) => string | null | undefined
  ): ConnectedDataListElement[] {
    const connectedDataList: ConnectedDataListElement[] = [];
    for (const element of list) {
      let displayName = getDisplayName(element);
      if (displayName == null) {
        displayName = 'Unknown display name!';
      }
      const dataListElement: ConnectedDataListElement = {
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
    getDisplayName: (value: T) => string | null | undefined
  ): void {
    if (!isCreateView && approachElements != null) {
      const allElementsCopy: T[] = copy(allElements);
      const difference = findArrayDifference(allElementsCopy, approachElements);

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

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public openSideNav() {
    return this.sidenav.open();
  }

  public closeSideNav() {
    return this.sidenav.close();
  }

  public toggleSideNav(): void {
    this.sidenav.toggle();
  }

  public setSideNavScenarioBased(scenarioBased: boolean) {
    this.scenarioBased = scenarioBased;
  }

  public isScenarioBasedMode() {
    return this.scenarioBased;
  }
}
