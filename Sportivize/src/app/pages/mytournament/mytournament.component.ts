import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface Tournoi {
  id: number;
  nom: string;
  date: string;
  participants: number;
  lieu: string;
  sport: string;
  estPublic: boolean;
  statut: 'en cours' | 'terminé';
}

@Component({
  selector: 'app-mytournament',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './mytournament.component.html',
  styleUrl: './mytournament.component.css'
})
export class MytournamentComponent {
  tournois: Tournoi[] = [
    { id: 1, nom: "Tournoi de la ville", date: "2024-07-15", participants: 32, lieu: "Parc central", sport: "Pétanque", estPublic: true, statut: 'en cours' },
    { id: 2, nom: "Championnat régional", date: "2024-08-01", participants: 64, lieu: "Boulodrome municipal", sport: "Pétanque", estPublic: true, statut: 'en cours' },
    { id: 3, nom: "Coupe des associations", date: "2023-08-22", participants: 16, lieu: "Place du village", sport: "Pétanque", estPublic: true, statut: 'terminé' },
    { id: 4, nom: "Open d'été", date: "2024-06-30", participants: 48, lieu: "Parc des sports", sport: "Tennis", estPublic: false, statut: 'en cours' },
    { id: 5, nom: "Tournoi des jeunes", date: "2024-09-10", participants: 24, lieu: "Gymnase municipal", sport: "Basketball", estPublic: true, statut: 'en cours' },
    { id: 6, nom: "Championnat intercommunal", date: "2023-10-15", participants: 40, lieu: "Terrain de rugby", sport: "Rugby", estPublic: false, statut: 'terminé' },
    { id: 7, nom: "Compétition amicale", date: "2024-02-12", participants: 20, lieu: "Salle polyvalente", sport: "Échecs", estPublic: true, statut: 'en cours' },
    { id: 8, nom: "Coupe du printemps", date: "2023-04-05", participants: 28, lieu: "Centre sportif", sport: "Football", estPublic: true, statut: 'terminé' },
    { id: 9, nom: "Grand tournoi national", date: "2024-11-15", participants: 100, lieu: "Stade national", sport: "Athlétisme", estPublic: true, statut: 'en cours' }
  ];

  filtreStatut: string = 'tous';

  get tournoisFiltres(): Tournoi[] {
    return this.filtreStatut === 'tous'
      ? this.tournois
      : this.tournois.filter(t => t.statut === this.filtreStatut);
  }

  onFiltreChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtreStatut = select.value;
  }
}