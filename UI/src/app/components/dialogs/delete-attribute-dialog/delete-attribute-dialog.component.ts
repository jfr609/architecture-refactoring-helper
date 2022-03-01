import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../../../utils/models/dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-attribute-dialog',
  templateUrl: './delete-attribute-dialog.component.html',
  styleUrls: ['./delete-attribute-dialog.component.css']
})
export class DeleteAttributeDialogComponent implements OnInit {
  selectedAttributes: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteAttributeDialogData<any>,
    public dialogRef: MatDialogRef<DeleteAttributeDialogComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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

  getDisplayName: (value: any) => string;
}
