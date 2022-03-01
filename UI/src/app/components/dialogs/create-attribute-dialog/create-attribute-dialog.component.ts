import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../../../utils/models/dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { FormControl, FormControlOptions, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-attribute-dialog',
  templateUrl: './create-attribute-dialog.component.html',
  styleUrls: ['./create-attribute-dialog.component.css']
})
export class CreateAttributeDialogComponent implements OnInit {
  createAttributeFields: CreateAttributeField[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateAttributeDialogData<any>,
    public dialogRef: MatDialogRef<CreateAttributeDialogComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    for (const attributeConfig of this.data.createAttributeConfigs) {
      this.createAttributeFields.push({
        value: '',
        formControl: new FormControl('', attributeConfig.validators),
        config: attributeConfig
      });
    }
  }

  isConfirmButtonActive(): boolean {
    let active: boolean = true;
    for (const attributeField of this.createAttributeFields) {
      active &&= attributeField.formControl.valid;
    }
    return active;
  }

  onChangeAttribute(event: Event, index: number) {
    this.createAttributeFields[index].value = (
      event.target as HTMLInputElement
    ).value;
  }

  onConfirmClicked() {
    this.dialogRef.close(this.data);
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}

export interface CreateAttributeDialogData<T> extends DialogData {
  attributesToCreate?: T[];
  currentAttributeList: T[];
  createAttributeConfigs: CreateAttributeConfig[];
}

export interface CreateAttributeField {
  value: string;
  formControl: FormControl;
  config: CreateAttributeConfig;
}

export interface CreateAttributeConfig {
  inputTitle: string;
  isTextArea: boolean;
  validators: ValidatorFn | ValidatorFn[] | FormControlOptions | null;
}
