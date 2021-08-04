import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsValidatorService {

  constructor() { }

  validateNonEmptyString() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const ok = this.nonEmptyString(control.value);
      return ok ? null : {NonEmpty: {'nonEmpty': ok}};
    }
  }

  private nonEmptyString(str: string): boolean {
    var trimmed = str.trim();
    if (!trimmed || trimmed.length < 5){
      return false;
    } 
    if (! /[a-zA-Z]/.test(trimmed)) {
      return false;
    }
    return true;
  }

  validateIntegerString() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const ok = this.integerString(control.value);
      return ok ? null : {IntegerString: {'notInteger': ok}};
    }
  }

  private integerString(str: string): boolean {
    if (str === null)
      return false;
    str = str.toString();
    var trimmed = str.trim();
    if (trimmed){
      return (/^\d+$/.test(trimmed));
    }
    return false;
  }

  validateNumberString() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const ok = this.numberString(control.value);
      return ok ? null : {IntegerString: {'notInteger': ok}};
    }
  }

  private numberString(str: string): boolean {
    if (str === null)
      return false;
    str = str.toString();
    var trimmed = str.trim();
    if (trimmed){
      return !(isNaN(Number(trimmed)));
    }
    return false;
  }

  validateImage(): boolean {
    return false;
  }
}
