import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  createSnackbar(type: string, message: string, durationMs: number = 3000): void {
    this.snackBar.open(message, '', {duration: durationMs, panelClass: [type]});
  }
}
