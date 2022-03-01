import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../../../utils/models/dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { CustomValidators } from '../../../utils/custom-validators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-attribute-dialog',
  templateUrl: './create-attribute-dialog.component.html',
  styleUrls: ['./create-attribute-dialog.component.css']
})
export class CreateAttributeDialogComponent implements OnInit {
  createAttributeForm: FormGroup = new FormGroup({});
  fields: CreateField[] = [];

  filteredOptions: Observable<string[]>[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateAttributeDialogData<any>,
    public dialogRef: MatDialogRef<CreateAttributeDialogComponent>,
    public dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    let controls: any = {};

    for (const fieldConfig of this.data.configs) {
      if (fieldConfig.autocompleteActive) {
        fieldConfig.autocompleteValues = this.data.currentAttributeList.map(
          (value) => value[fieldConfig.variableName]
        );
      }

      this.fields.push({
        value: '',
        config: fieldConfig
      });

      controls[fieldConfig.variableName] = ['', fieldConfig.validators];
    }

    this.createAttributeForm = this.builder.group(controls, {
      validators: [
        CustomValidators.disallowDuplicates(this.data.currentAttributeList)
      ]
    });

    this.data.configs.forEach(
      (fieldConfig: CreateFieldConfig, index: number) => {
        if (!fieldConfig.autocompleteActive) return;

        this.filteredOptions[index] = this.createAttributeForm.controls[
          fieldConfig.variableName
        ].valueChanges.pipe(
          map((value) => this._filter(value, fieldConfig.variableName))
        );
      }
    );
  }

  private _filter(value: string, variableName: string): string[] {
    const filterValue = value.toLowerCase();

    return this.data.currentAttributeList
      .filter((option) =>
        option[variableName].toLowerCase().startsWith(filterValue)
      )
      .map((option) => option[variableName])
      .filter(
        (option, index: number, self: any[]) => index === self.indexOf(option)
      );
  }

  isConfirmButtonActive(): boolean {
    return this.createAttributeForm.valid;
  }

  onInputChanged(event: Event, index: number) {
    this.fields[index].value = (event.target as HTMLInputElement).value;
  }

  onAutocompleteOptionSelected(value: string, index: number) {
    this.fields[index].value = value;
  }

  onConfirmClicked() {
    this.createAttributeObjects();
    this.dialogRef.close(this.data);
  }

  createAttributeObjects() {
    this.data.attributesToCreate = [];
    let attribute: any = {};
    for (const fieldInfo of this.fields) {
      attribute[fieldInfo.config.variableName] = fieldInfo.value;
    }
    this.data.attributesToCreate.push(attribute);
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}

export interface CreateAttributeDialogData<T> extends DialogData {
  attributesToCreate?: T[];
  currentAttributeList: T[];
  activateMultiCreate?: boolean;
  configs: CreateFieldConfig[];
}

export interface CreateField {
  value: string;
  config: CreateFieldConfig;
}

export interface CreateFieldConfig {
  title: string;
  variableName: string;
  isTextArea: boolean;
  autocompleteActive?: boolean;
  autocompleteValues?: string[];
  validators: ValidatorFn | ValidatorFn[] | FormControlOptions | null;
}
