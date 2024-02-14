import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackbar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    })
  }

}
