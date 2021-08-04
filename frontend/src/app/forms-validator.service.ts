import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsValidatorService {

  constructor() { }

  validateNonEmptyString(str: string): boolean {
    var trimmed = str.trim();
    if (!trimmed){
      return false;
    } 
    if (! /[a-zA-Z]/.test(trimmed)) {
      return false;
    }
    return true;
  }

  validateIntegerString(str: string): boolean {
    var trimmed = str.trim();
    if (trimmed){
      return (/^\d+$/.test(trimmed));
    }
    return false;
  }

  validateNumberString(str: string): boolean {
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
