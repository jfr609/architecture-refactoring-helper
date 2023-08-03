import { Component, ElementRef, ViewChild, Inject,   } from '@angular/core';
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
import { ProjectSessionService } from '../../../../../api/repository/services/project-session-service';
import { lastValueFrom } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { ProjectSession } from '../../../../../api/repository/models/project-session';



@Component({
  selector: 'app-architecture-refactoring-helper',
  templateUrl: './architecture-refactoring-helper.component.html',
  styleUrls: ['./architecture-refactoring-helper.component.scss']
})
export class ArchitectureRefactoringHelperComponent {
  applicationTitle = APP_TITLE;
  @ViewChild('sideNav') public sidenav!: MatSidenav;
  @ViewChild('importInput') importInput!: ElementRef;

  readonly QualityCategories = QualityCategory;
  readonly RecommendationSuitability = RecommendationSuitability;
  //projectSessionService: any;

  constructor(
    private permissionService: PermissionService,
    public utilService: UtilService,
    public projectService: ProjectService,
    public attributeOptionsService: AttributeOptionsService,
    public recommendationService: ApproachRecommendationService,
    public projectSessionService: ProjectSessionService
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

  changeSession(){

  }
  exportDB() {
    lastValueFrom(
      this.projectSessionService.listProjectSessions({
        withDetails: true
      })
    ).then((projectSessions: ProjectSession[]) => {
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.download = 'projectSession.json';
      const fileContent: string = JSON.stringify(projectSessions);
      downloadLink.href = 'data:text/plain;charset=utf-16,' + fileContent;
      downloadLink.click();
      downloadLink.remove();
    });
  
  }

  importDB() {
    this.importInput?.nativeElement.click();
  }
  handleSessionImport(event: Event){
    const files: FileList | null = (event.currentTarget as HTMLInputElement)
      .files;
    if (files != null && files.length > 0) {
      files[0].text().then((value: string) => {
        const projectSessions: ProjectSession[] = JSON.parse(value);
        const promises: Promise<ProjectSession>[] = [];
        for (const projectSession of projectSessions) {
          promises.push(
            lastValueFrom(
              this.projectSessionService.addProjectSession({
                body: projectSession
              })
            )
          );
        }
  
        Promise.all(promises)
          .then(() => {
            this.utilService.callSnackBar(
              'Project was imported successfully.'
            );
          })
          .catch((reason) => {
            console.log(reason);
            this.utilService.callSnackBar(
              'Error! Some Project could not be imported. ' +
                'This can happen if Project already exist or are invalid. ' +
                'Please check if your selected file is valid.'
            );
          });
      });
    }
  }
}
