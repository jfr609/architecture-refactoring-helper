import { Component } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-framework-phase-two',
  templateUrl: './framework-phase-two.component.html',
  styleUrls: ['./framework-phase-two.component.scss']
})
export class FrameworkPhaseTwoComponent {
  constructor(public permissionService: PermissionService) {}
}
