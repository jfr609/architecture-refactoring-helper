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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteAttributeDialogData,
    public dialogRef: MatDialogRef<DeleteAttributeDialogComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }
}

export interface DeleteAttributeDialogData extends DialogData {}
