import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = `${environment.apiUrl}/payments`;

    constructor(private http: HttpClient) { }

    createPaymentIntent(amount: number, currency: string): Observable<any> {
        console.log('📡 Envoi de la requête à l’API:', this.apiUrl, amount, currency);
        return this.http.post(`${this.apiUrl}/create-payment-intent`, { amount, currency });
    }
}
