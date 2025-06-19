import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink,MatRippleModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {

}
