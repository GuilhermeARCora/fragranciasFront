import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fragancias';
    showAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'SweetAlert2 is working!',
      icon: 'success',
      confirmButtonText: 'Cool 😎'
    });
  }
}
