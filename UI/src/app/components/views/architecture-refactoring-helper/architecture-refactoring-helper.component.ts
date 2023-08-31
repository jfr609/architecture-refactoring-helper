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
import { ProjectDescription} from '../../../../../api/repository/models/project-description';
import { ProjectDescriptionService } from '../../../../../api/repository/services/project-description.service';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { StrategicGoals } from 'api/repository/models/strategic-goals';
import { ScenarioService } from 'api/repository/services';
import { Scenario } from 'api/repository/models';
import { ObjectivesService } from 'api/repository/services/objectives-service';
import { Objectives } from 'api/repository/models/objectives';
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
    public projectSessionService: ProjectSessionService,
    public projectDescriptionService: ProjectDescriptionService,
    public strategicGoalsService: StrategicGoalsService,
    public objectivesService: ObjectivesService,
    public scenarioService: ScenarioService,
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

  clearSession(){
    for(let i = 1; i < 100; i++){
        this.projectDescriptionService
        .deleteProjectDescription({
          id: i!
        })
        .subscribe({
          next: (value) => {},
          error: (err) => {
            console.log(err);
            this.utilService.callSnackBar(
              'Project Description could not be deleted.'
            );
          }
        });
        this.strategicGoalsService
        .deleteStrategicGoals({
          id: i!
        })
        .subscribe({
          next: (value) => {},
          error: (err) => {
            console.log(err);
            this.utilService.callSnackBar(
              'Strategic Goals could not be deleted.'
            );
          }
        });
        this.objectivesService
        .deleteObjectives({
          id: i!
        })
        .subscribe({
          next: (value) => {},
          error: (err) => {
            console.log(err);
            this.utilService.callSnackBar(
              'Objectives could not be deleted.'
            );
          }
        });
        this.scenarioService
        .deleteScenario({
          id: i!
        })
        .subscribe({
          next: (value) => {},
          error: (err) => {
            console.log(err);
            this.utilService.callSnackBar(
              'Scenario could not be deleted.'
            );
          }
        });
        
      
      
      
      
      
      /*







      this.projectDescriptionService.deleteProjectDescription({id: i});
      console.log("deleted project description");
      this.strategicGoalsService.deleteStrategicGoals({id: i});
      console.log("deleted strategic goals");
      this.objectivesService.deleteObjectives({id: i});
      console.log("deleted objectives");
      this.scenarioService.deleteScenario({id: i});
      console.log("deleted scenario")*/
    }
    
  }
  exportDB() {
    let fileContentDS: string = "";
    let fileContentSG: string = "";
    let fileContentOB: string = "";
    let fileContentSC: string = "";
    let fileContentAS: string = "";
    lastValueFrom(
      this.projectDescriptionService.listProjectDescription({
        withDetails: true
      })
    ).
    then((projectDescription: ProjectDescription[]) => {
      //const downloadLink: HTMLAnchorElement = document.createElement('a');
      ///downloadLink.download = 'project.json';
      fileContentDS= JSON.stringify(projectDescription);
    }),
    lastValueFrom(
      this.strategicGoalsService.listStrategicGoals({
         withDetails: true
      })
    ).
    then((strategicGoals: StrategicGoals[]) => {
      //const downloadLink: HTMLAnchorElement = document.createElement('a');
      //downloadLink.download = 'project.json';
      fileContentSG = JSON.stringify(strategicGoals);
    }),

    
    lastValueFrom(
      this.objectivesService.listObjectives({
         withDetails: true
      })
    ).
    then((objectives: Objectives[]) => {
      //const downloadLink: HTMLAnchorElement = document.createElement('a');
      //downloadLink.download = 'project.json';
      fileContentSG = JSON.stringify(objectives);
    }),



    lastValueFrom(
      this.scenarioService.listScenario({
          withDetails: true
          })
      ).
    then((scenario: Scenario[]) => {
      fileContentSC = JSON.stringify(scenario);
           
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.download = 'project.json'; 
      downloadLink.href = 'data:text/plain;charset=utf-16,'+ fileContentDS + "," + fileContentSG + "," +fileContentOB + ","+ fileContentSC;// better concatenation;
      downloadLink.click();
      downloadLink.remove();
    });
  }
  
  /*exportDB(){  
    lastValueFrom(
      this.strategicGoalsService.listStrategicGoals({
        withDetails: true
      })
    ).
    then((strategicGoals: StrategicGoals[]) => {
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.download = 'project.json';
      const fileContent: string = JSON.stringify(strategicGoals);
      downloadLink.href = 'data:text/plain;charset=utf-16,'+ fileContent;// + fileContent;
      downloadLink.click();
      downloadLink.remove();
    });
  }*/
  importDB() {
    this.importInput?.nativeElement.click();
  }
  handleSessionImport(event: Event){
    const files: FileList | null = (event.currentTarget as HTMLInputElement)
      .files;
    if (files != null && files.length > 0) {
      files[0].text().then((value: string) => {
        //const projectSessions: ProjectSession[] = JSON.parse(value);
        const projectDescriptions: ProjectDescription[] = JSON.parse(value);
        const strategicGoals: StrategicGoals[] = JSON.parse(value);
        const objectives: Objectives[] = JSON.parse(value);
        const scenarios: Scenario[] = JSON.parse(value);
        //const promises: Promise<ProjectSession>[] = [];
        const promises: Promise<void>[] = [];
        for (const projectDescription of projectDescriptions) {
          promises.push(
            lastValueFrom(
              this.projectDescriptionService.addProjectDescription({
                body: projectDescription
              })
            )
          );
        }
        for (const strategicGoal of strategicGoals) {
          promises.push(
            lastValueFrom(
              this.strategicGoalsService.addStrategicGoals({
                body: strategicGoal
              })
            )
          );
        }
        for (const objective of objectives) {
          promises.push(
            lastValueFrom(
              this.objectivesService.addObjectives({
                body: objective
              })
            )
          );
        }
        for (const scenario of scenarios) {
          promises.push(
            lastValueFrom(
              this.scenarioService.addScenario({
                body: scenario
              })
            )
          );
        }




  //promise for strategic goals
  //promise for objectives
  //promise for scenarios
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
