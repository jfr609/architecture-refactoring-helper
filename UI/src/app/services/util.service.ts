import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  timeOut = 3000;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  public createDialog(dialogComponent: any, data: any, width?: string, height?: string): MatDialogRef<any> {
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
