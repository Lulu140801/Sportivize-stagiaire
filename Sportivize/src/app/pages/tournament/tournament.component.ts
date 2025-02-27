import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface Tournoi {
  id: number;
  nom: string;
  date: string;
  participants: number;
  lieu: string;
  adresse: string;
  organisateur: string;
  sport: string;
  estPublic: boolean;
}

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
  sports: string[] = ["Pétanque", "Football", "Basketball", "Tennis", "Volleyball"];

  tournois: Tournoi[] = [
    { id: 1, nom: "Tournoi de la ville", date: "2024-07-15", participants: 32, lieu: "Parc central", adresse: "2 chemin de daran 31780 castelginest", organisateur: "patric", sport: "Pétanque", estPublic: true },
    { id: 2, nom: "Championnat régional", date: "2024-08-01", participants: 64, lieu: "Boulodrome municipal", adresse: "2 chemin de daran 31780 castelginest", organisateur: "patric", sport: "Pétanque", estPublic: true },
    { id: 3, nom: "Coupe des associations", date: "2024-08-22", participants: 16, lieu: "Place du village", adresse: "2 chemin de daran 31780 castelginest", organisateur: "patric", sport: "Pétanque", estPublic: true },
  ];

  filtreLieu: string = "";
  filtreSport: string = "";
  nouveauTournoi: Tournoi = {
    id: 0,
    nom: "",
    date: "",
    participants: 0,
    lieu: "",
    adresse: "",
    organisateur: "",
    sport: "",
    estPublic: false
  };

  get tournoisFiltres(): Tournoi[] {
    return this.tournois.filter(t =>
      t.estPublic &&
      (this.filtreLieu === "" || t.lieu.toLowerCase().includes(this.filtreLieu.toLowerCase())) &&
      (this.filtreSport === "" || t.sport === this.filtreSport)
    );
  }

  handleSubmit() {
    const newTournoi: Tournoi = {
      ...this.nouveauTournoi,
      id: this.tournois.length + 1,
      participants: Number(this.nouveauTournoi.participants)
    };
    this.tournois = [...this.tournois, newTournoi];
    this.resetNouveauTournoi();
  }

  resetNouveauTournoi() {
    this.nouveauTournoi = {
      id: 0,
      nom: "",
      date: "",
      participants: 0,
      lieu: "",
      adresse: "",
      organisateur: "",
      sport: "",
      estPublic: false
    };
  }
}
