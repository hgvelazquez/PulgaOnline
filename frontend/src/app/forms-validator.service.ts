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

  validateLengthString(min: number, max: number) : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const ok = this.rangeString(control.value, min, max);
      return ok ? null : {Length: {'outOfRange': ok}};
    }
  }

  private rangeString(str: string, min: number, max: number): boolean {
    var trimmed = str.trim();
    
    if (!trimmed){
      return false;
    } 
    var range = true;
    if (min != -1) {
      range = (trimmed.length >= min);
    }
    if (max != -1)
      range = range && (trimmed.length<=max);
    return range;
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

  private validateFileImage(file: File): boolean {
    if (!file) {
      return false;
    }  

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return false;
    }

    return true;
  }

  validateImage() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const file = control.value;
      const ok = this.validateFileImage(file);
      return ok ? null : {FileValidator: {'notImage': ok}};
    }
  }
}
