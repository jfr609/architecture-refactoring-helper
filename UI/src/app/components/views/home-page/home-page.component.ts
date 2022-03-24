import { Component } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(public permissionService: PermissionService) {}
}
