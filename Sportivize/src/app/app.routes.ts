import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { TournamentComponent } from '../app/pages/tournament/tournament.component';
import { AuthGuard } from './guards/auth.guard';
import { MytournamentComponent } from './pages/mytournament/mytournament.component';
import { TournamentmanagementComponent } from './pages/tournamentmanagement/tournamentmanagement.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard] },
    { path: 'mytournament', component: MytournamentComponent, canActivate: [AuthGuard] },
    { path: 'tournamentmanagement', component: TournamentmanagementComponent, canActivate: [AuthGuard] },
    { path: 'termsandconditions', component: TermsAndConditionsComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
];