import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';


interface Joueur {
  id: number;
  nom: string;
}

interface Match {
  id: number;
  equipe1: Joueur[];
  equipe2: Joueur[];
  score1?: number;
  score2?: number;
}

interface Tournoi {
  id: number;
  nom: string;
  date: string;
  participants: number;
  lieu: string;
  sport: string;
  estPublic: boolean;
  matchs: Match[];
}

@Component({
  selector: 'app-tournamentmanagement',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './tournamentmanagement.component.html',
  styleUrls: ['./tournamentmanagement.component.css']
})
export class TournamentmanagementComponent {
  tournoi: Tournoi = {
    id: 1,
    nom: 'Tournoi de la ville',
    date: '2024-07-15',
    participants: 32,
    lieu: 'Parc central',
    sport: 'Pétanque',
    estPublic: true,
    matchs: [
      { id: 1, equipe1: [{ id: 1, nom: 'Alice' }, { id: 2, nom: 'Bob' }], equipe2: [{ id: 3, nom: 'Charlie' }, { id: 4, nom: 'David' }] },
      { id: 2, equipe1: [{ id: 5, nom: 'Eve' }, { id: 6, nom: 'Frank' }], equipe2: [{ id: 7, nom: 'Grace' }, { id: 8, nom: 'Henry' }] }
    ]
  };

  activeTab = 'matchs';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Nouvelle méthode pour obtenir les noms des joueurs
  getEquipeNoms(equipe: Joueur[]): string {
    return equipe.map(j => j.nom).join(', ');
  }

  // Méthode pour afficher le score du match
  getScore(match: Match): string {
    return match.score1 !== undefined && match.score2 !== undefined
      ? match.score1 + ' - ' + match.score2
      : 'À jouer';
  }

  // Méthode pour obtenir le nombre de matchs joués
  getMatchsJoues(): number {
    return this.tournoi.matchs.filter(m => m.score1 !== undefined).length;
  }
}
