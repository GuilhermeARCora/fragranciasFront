import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-politicas',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.scss'
})
export class PoliticasComponent {

}
