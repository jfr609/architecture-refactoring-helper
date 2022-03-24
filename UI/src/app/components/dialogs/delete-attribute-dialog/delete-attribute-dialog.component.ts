import { Component, Inject } from '@angular/core';
import { DialogData } from '../../../utils/models/dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-attribute-dialog',
  templateUrl: './delete-attribute-dialog.component.html',
  styleUrls: ['./delete-attribute-dialog.component.scss']
})
export class DeleteAttributeDialogComponent {
  selectedAttributes: unknown[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteAttributeDialogData<unknown>,
    public dialogRef: MatDialogRef<DeleteAttributeDialogComponent>,
    public dialog: MatDialog
  ) {}

  onCancelClicked() {
    this.dialogRef.close();
  }

  onConfirmClicked() {
    this.data.attributesToDelete = [];

    for (const selectedAttribute of this.selectedAttributes) {
      this.data.currentAttributeList.forEach((value) => {
        if (
          this.data.getDisplayName(value) ===
          this.data.getDisplayName(selectedAttribute)
        ) {
          this.data.attributesToDelete?.push(value);
        }
      });
    }

    this.dialogRef.close(this.data);
  }
}

export interface DeleteAttributeDialogData<T> extends DialogData {
  attributesToDelete?: T[];
  currentAttributeList: T[];

  getDisplayName: (value: T) => string;
}
