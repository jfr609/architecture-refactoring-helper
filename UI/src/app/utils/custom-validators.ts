import { AbstractControl, ValidationErrors } from '@angular/forms';
import { URL_REGEX } from '../app.constants';

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
}
