import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Stripe, loadStripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  clientSecret: string | null = null;

  @ViewChild('cardElementContainer') cardElementContainer!: ElementRef;

  constructor(private paymentService: PaymentService) { }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51PWDie034IcV2gwZpcPosgV3gtCFKNkkAy4GV0n3GDyM2WnX5fPJdNlQpt4F4ft1dMFlpawH36m2AAGIcHQNNWc200sK5ikncX');
    console.log('📡 Stripe chargé:', this.stripe);

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card', {
        hidePostalCode: true,
      });

      console.log('cardElement créé:', this.cardElement);

      if (this.cardElementContainer) {
        this.cardElement.mount(this.cardElementContainer.nativeElement);
        console.log('cardElement monté.');
      } else {
        console.error('cardElementContainer non trouvé.');
      }
    }
  }

  async pay() {
    if (!this.stripe || !this.cardElement) {
      console.error('Stripe ou cardElement non disponible.');
      return;
    }

    this.paymentService.createPaymentIntent(1000000, 'eur').subscribe(async (res) => {
      console.log('📩 Réponse de l’API:', res);

      if (!res || !res.clientSecret) {
        console.error('Aucun clientSecret reçu !');
        return;
      }

      this.clientSecret = res.clientSecret;
      console.log('clientSecret reçu:', this.clientSecret);

      const { error } = await this.stripe!.confirmCardPayment(this.clientSecret!, {
        payment_method: {
          card: this.cardElement!,
        }
      });

      if (error) {
        console.error('Erreur de paiement:', error);
      } else {
        console.log('Paiement réussi !');
      }
    });
  }
}
