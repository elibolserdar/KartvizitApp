import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card,
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(50)]],
      title: [this.data?.title || '', Validators.required],
      phone: this.data?.phone || '',
      email: [this.data?.email || '', [Validators.required, Validators.email]], 
      address: [this.data?.address || '', Validators.required]
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        this.getSuccess(res);
      }, (err: any) => {
        this.getError(err.message);
      });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value)
      .subscribe((res: any) => {
        this.getSuccess(res);
      }, (err: any) => {
        this.getError(err.message);
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.name)
      .subscribe((res: any) => {
        this.getSuccess(res);
      }, (err: any) => {
        this.getError(err.message);
      });
  }

  getSuccess(res: string): void {
    this.snackbarService.createSnackbar('success', res || 'Apiden cavap gelmedi.');
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(errMessage: string){
    this.snackbarService.createSnackbar('error', errMessage || 'Bir hata oluştu.');      
    this.showSpinner = false;
  }
}
