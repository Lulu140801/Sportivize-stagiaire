import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Fournir HttpClient
import { RouterModule } from '@angular/router';  // Ajouter RouterModule pour la gestion des routes

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';  // NavbarStandaloneComponent

@NgModule({
    declarations: [AppComponent],  // Déclare le composant principal de l'application
    imports: [BrowserModule, RouterModule],  // Ajoute RouterModule et autres modules nécessaires
    providers: [
        provideHttpClient()  // Fournit HttpClient pour les requêtes HTTP
    ],
    bootstrap: [AppComponent],  // Définit AppComponent comme composant principal
})
export class AppModule { }
