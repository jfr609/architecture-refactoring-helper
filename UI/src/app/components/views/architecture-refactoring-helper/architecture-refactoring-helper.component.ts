import { Component, ViewChild } from '@angular/core';
import { APP_TITLE } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { ApplicationSettingsDialogComponent } from '../../dialogs/application-settings-dialog/application-settings-dialog.component';
import { DialogData } from '../../../utils/models/dialog-data';
import { PermissionService } from '../../../services/permission.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { QualityCategory, RecommendationSuitability } from 'api/repository/models';
import { ApproachRecommendationService } from 'src/app/services/approach-recommendation.service';

@Component({
  selector: 'app-architecture-refactoring-helper',
  templateUrl: './architecture-refactoring-helper.component.html',
  styleUrls: ['./architecture-refactoring-helper.component.scss']
})
export class ArchitectureRefactoringHelperComponent {
  applicationTitle = APP_TITLE;
  @ViewChild('sideNav') public sidenav!: MatSidenav;

  readonly QualityCategories = QualityCategory;
  readonly RecommendationSuitability = RecommendationSuitability;

  constructor(
    private permissionService: PermissionService,
    public utilService: UtilService,
    public projectService: ProjectService,
    public attributeOptionsService: AttributeOptionsService,
    public recommendationService: ApproachRecommendationService
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

  ngAfterViewInit(): void {
    this.utilService.setSidenav(this.sidenav);
  }
}
