import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-user-info',
  imports: [MatIcon,MatMenuModule,MatDividerModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

}
