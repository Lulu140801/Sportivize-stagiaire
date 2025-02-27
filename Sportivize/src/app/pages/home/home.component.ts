import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private modalService: ModalService) { }

  openSignupModal() {
    this.modalService.openSignup();
  }
}
