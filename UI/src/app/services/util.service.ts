import {Component, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ComponentType} from "@angular/cdk/overlay";
import {DialogData} from "../utils/models/dialog-data";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  timeOut = 3000;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  public createDialog(dialogComponent: ComponentType<any>, data: DialogData, width?: string, height?: string): MatDialogRef<any> {
    return this.dialog.open(dialogComponent, {
      width: width || '400px',
      height: height || undefined,
      data,
    });
  }

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', {
      duration: this.timeOut,
    });
  }
}
