import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[];

  constructor(

    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  getCards(): void {
    this.http.get<Card[]>( this.apiUrl + '/Cards/GetCards')
    .subscribe((res: Card[]) => {
      this.cards = res;
    });
  }

  addCard(card: Card): Observable<string>{
    return this.http.post(this.apiUrl + '/Cards/AddCardAsync', card, { responseType: 'text' });
  }

  updateCard(card: Card): Observable<string>{
    return this.http.post(this.apiUrl + '/Cards/UpdateCard', card, { responseType: 'text' });
  }

  deleteCard(name: string): Observable<string>{
    return this.http.delete(this.apiUrl + '/Cards/DeleteCard?name=' + name, { responseType: 'text' });
  }
}
