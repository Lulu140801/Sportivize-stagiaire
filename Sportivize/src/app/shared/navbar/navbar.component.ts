import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  showLogin: boolean = false;
  showSignup: boolean = false;
  email: string = '';
  password: string = '';
  username: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private modalService: ModalService) {
    this.modalService.showSignup$.subscribe((show) => {
      this.showSignup = show;
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignup = false;
  }

  switchToSignup() {
    this.showLogin = false;
    this.showSignup = true;
  }

  switchToLogin() {
    this.showSignup = false;
    this.showLogin = true;
  }

  closeModal() {
    this.showLogin = false;
    this.modalService.closeSignup();
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Veuillez renseigner votre email et mot de passe.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.accessToken, response.refreshToken);
        this.isAuthenticated = true;
        this.closeModal();
        console.log('Connexion réussie !');
      },
      error: (err) => {
        console.error('Erreur lors de la connexion :', err);
        alert('Échec de la connexion. Email ou mot de passe incorrect.');
      },
    });
  }

  onSignup() {
    if (!this.username || !this.email || !this.password) {
      alert('Veuillez renseigner tous les champs.');
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        this.switchToLogin();
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte :', err);
        alert('Échec de la création du compte. Veuillez réessayer.');
      },
    });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.email = '';
    this.password = '';
  }
}
