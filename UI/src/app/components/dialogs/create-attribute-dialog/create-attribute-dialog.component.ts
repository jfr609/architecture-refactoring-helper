import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../../../utils/models/dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-attribute-dialog',
  templateUrl: './create-attribute-dialog.component.html',
  styleUrls: ['./create-attribute-dialog.component.css']
})
export class CreateAttributeDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateAttributeDialogData,
    public dialogRef: MatDialogRef<CreateAttributeDialogComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }
}

export interface CreateAttributeDialogData extends DialogData {}
