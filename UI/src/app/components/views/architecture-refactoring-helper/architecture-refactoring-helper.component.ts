import { Component, ElementRef, ViewChild, Inject,   } from '@angular/core';
import { APP_TITLE } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { ApplicationSettingsDialogComponent } from '../../dialogs/application-settings-dialog/application-settings-dialog.component';
import { DialogData } from '../../../utils/models/dialog-data';
//import { PermissionService } from '../../../services/permission.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { QualityCategory, RecommendationSuitability } from 'api/repository/models';
import { ApproachRecommendationService } from 'src/app/services/approach-recommendation.service';;
import { lastValueFrom } from 'rxjs';
import { ProjectDescription} from '../../../../../api/repository/models/project-description';
import { ProjectDescriptionService } from '../../../../../api/repository/services/project-description.service';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { StrategicGoals } from 'api/repository/models/strategic-goals';
import { ScenarioService } from 'api/repository/services';
import { Scenario } from 'api/repository/models';
import { ObjectivesService } from 'api/repository/services/objectives-service';
import { Objectives } from 'api/repository/models/objectives';
import { concatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssessmentComponent } from '../phase-one-views/assessment/assessment.component';
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

  constructor(
    //private permissionService: PermissionService,
    public utilService: UtilService,
    public projectService: ProjectService,
    public attributeOptionsService: AttributeOptionsService,
    public recommendationService: ApproachRecommendationService,
    public projectDescriptionService: ProjectDescriptionService,
    public strategicGoalsService: StrategicGoalsService,
    public objectivesService: ObjectivesService,
    public scenarioService: ScenarioService,
    public assessmentComponent: AssessmentComponent
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

  clearSession() {
    for (let i = 1; i < 100; i++) {
      this.projectDescriptionService
        .deleteProjectDescription({
          id: i!
        })
        .pipe(
          concatMap(() => this.strategicGoalsService.deleteStrategicGoals({ id: i! })),
          concatMap(() => this.objectivesService.deleteObjectives({ id: i! })),
          concatMap(() => this.scenarioService.deleteScenario({ id: i! })),
          catchError((error) => {
            console.log(error);
            this.utilService.callSnackBar('Error deleting data.');
            return of(null); // Skip to the next observable if an error occurs
          })
        )
        .subscribe(() => {
          // Handle successful deletion if needed
        });
    }
  }

  clearSession2(){

    this.projectDescriptionService
    .deleteProjectDescription({
      id: 1
    })
    .subscribe({
      next: (value) => {},
    });   
    
    this.strategicGoalsService
    .deleteStrategicGoals({
      id: 1
    })
    .subscribe({
      next: (value) => {},
    });
    
    for(let i = 1; i < 20; i++){
      this.objectivesService
      .deleteObjectives({
        id: i!
      })
      .subscribe({
        next: (value) => {},
      });

        this.scenarioService
        .deleteScenario({
          id: i!
        })
        .subscribe({
          next: (value) => {},
          
          error: (err) => {
            console.log(err);

            window.location.reload();
            this.utilService.callSnackBar(
              'Project Description, Strategic Goals, Objectives and Scenarios successfully deleted.'
              
            );
          }
        });
    }
    this.utilService.callSnackBar(
      'Project Description, Strategic Goals, Objectives and Scenarios successfully deleted.'
      
    );
  
  }

  exportDB() {
    let fileContentDS = "";
    let fileContentSG = "";
    let fileContentOB = "";
    let fileContentSC = "";
  
    const exportData = async () => {
      try {
        const projectDescription = await lastValueFrom(
          this.projectDescriptionService.listProjectDescription({
            withDetails: true
          })
        );
        fileContentDS = JSON.stringify(projectDescription);
  
        const strategicGoals = await lastValueFrom(
          this.strategicGoalsService.listStrategicGoals({
            withDetails: true
          })
        );
        fileContentSG = JSON.stringify(strategicGoals);
  
        const objectives = await lastValueFrom(
          this.objectivesService.listObjectives({
            withDetails: true
          })
        );
        fileContentOB = JSON.stringify(objectives);
  
        const scenario = await lastValueFrom(
          this.scenarioService.listScenario({
            withDetails: true
          })

        );

        fileContentSC = JSON.stringify(scenario);
  
        const combinedData = {
          projectDescription: JSON.parse(fileContentDS),
          strategicGoals: JSON.parse(fileContentSG),
          objectives: JSON.parse(fileContentOB),
          scenario: JSON.parse(fileContentSC)
        };
  
        const downloadLink = document.createElement('a');
        downloadLink.download = 'project.json';
        downloadLink.href = 'data:text/plain;charset=utf-16,' + JSON.stringify(combinedData,null,2);
        downloadLink.click();
        downloadLink.remove();
      } catch (error) {
        // Handle any errors that may occur during the data retrieval or export.
        console.error('Export failed:', error);
      }
    };
  
    exportData();
  }
  
  importDB() {
    this.clearSession();
    //window.location.reload();
    this.importInput?.nativeElement.click();
  }
  
  handleSessionImport(event: Event) {
    const files: FileList | null = (event.currentTarget as HTMLInputElement).files;
    if (files != null && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        try {
          if (event.target) {
            const value: string = event.target.result as string;
            const parsedData = JSON.parse(value);
  
            if (parsedData.projectDescription) {
              const projectDescriptions: ProjectDescription[] = parsedData.projectDescription;
              if (projectDescriptions.length > 0) {
                const firstProjectDescription: ProjectDescription = projectDescriptions[0];
                await this.importProjectDescriptions([firstProjectDescription]);
              }
            }
  
            if (parsedData.strategicGoals) {
              const strategicGoals: StrategicGoals[] = parsedData.strategicGoals;
              await this.importStrategicGoals(strategicGoals);
            }
  
            if (parsedData.objectives) {
              const objectives: Objectives[] = parsedData.objectives;
              await this.importObjectives(objectives);
            }
  
            if (parsedData.scenario) {
              const scenarios: Scenario[] = parsedData.scenario;
              await this.importScenarios(scenarios);
            }
          
            this.utilService.callSnackBar('Data imported successfully.');
            if (this.assessmentComponent) {
              this.assessmentComponent.saveChanges();
            } else {
              console.error('assessmentComponent is not initialized.');
            }
          }
        } catch (error) {
          console.error(error);
          this.utilService.callSnackBar('Error importing data. Please check the file format.');
        }
      };
  
      reader.readAsText(file);
    }
  }
  //this.assessmentComponent.saveChanges();
  
  private async importProjectDescriptions(projectDescriptions: ProjectDescription[]): Promise<void> {
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
  
    await Promise.all(promises);
  }
  
  private async importStrategicGoals(strategicGoals: StrategicGoals[]): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const strategicGoal of strategicGoals) {
      promises.push(
        lastValueFrom(
          this.strategicGoalsService.addStrategicGoals({
            body: strategicGoal
          })
        )
      );
    }
  
    await Promise.all(promises);
  }
  
  private async importObjectives(objectives: Objectives[]): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const objective of objectives) {
      promises.push(
        lastValueFrom(
          this.objectivesService.addObjectives({
            body: objective
          })
        )
      );
    }
  
    await Promise.all(promises);
  }
  
  private async importScenarios(scenarios: Scenario[]): Promise<void> {
    const promises: Promise<void>[] = [];

  
    for (const scenario of scenarios) {

  
      promises.push(
        lastValueFrom(
          this.scenarioService.addScenario({
            body: scenario
          })
        )
      );
    }
  
    await Promise.all(promises);
  }
}
