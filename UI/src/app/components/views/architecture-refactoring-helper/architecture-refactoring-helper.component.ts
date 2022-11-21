import { Component } from '@angular/core';
import { APP_TITLE } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { ApplicationSettingsDialogComponent } from '../../dialogs/application-settings-dialog/application-settings-dialog.component';
import { DialogData } from '../../../utils/models/dialog-data';
import { PermissionService } from '../../../services/permission.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-architecture-refactoring-helper',
  templateUrl: './architecture-refactoring-helper.component.html',
  styleUrls: ['./architecture-refactoring-helper.component.scss']
})
export class ArchitectureRefactoringHelperComponent {
  applicationTitle = APP_TITLE;

  constructor(
    private permissionService: PermissionService,
    private utilService: UtilService,
    public projectService: ProjectService
  ) {}
  

  openSettingsDialog() {
    const data: DialogData = {
      title: 'Application settings',
      confirmButtonText: '',
      cancelButtonText: 'Close'
    };
    this.utilService
      .createDialog(ApplicationSettingsDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (value: DialogData) => {
          console.log(value);
        }
      });
  }
}
