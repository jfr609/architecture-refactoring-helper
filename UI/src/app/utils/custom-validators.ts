import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { URL_REGEX } from '../app.constants';
import { keyEquals } from './utils';

export class CustomValidators {
  static url(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value === 'string') {
      let url: string = control.value;
      if (url.match(URL_REGEX)) {
        return null;
      }
    }
    return {
      url: true
    };
  }

  static disallowDuplicates(duplicateList: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let element: any = control.value;
      let duplicate = duplicateList.find((value) => keyEquals(value, element));
      if (duplicate == null) {
        return null;
      }

      return {
        disallowDuplicates: {
          duplicate: duplicate
        }
      };
    };
  }
}
