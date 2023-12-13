import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  OnInit,AfterViewInit, OnChanges, ViewChild
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { FormControl, Validators } from '@angular/forms';
import { RatingLevel } from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
import { Languages } from 'api/repository/models/languages';
import { Patterns } from 'api/repository/models/patterns';
import { StrategicGoals } from 'api/repository/models';
import { AssessmentComponent } from '../assessment/assessment.component';
import { AssessmentService } from 'api/repository/services/assessment-service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{
  @ViewChild(AssessmentComponent) public assessmentComponent: AssessmentComponent | undefined;
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  enumKeys2: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  selectedStrategicGoals?: StrategicGoals;


  //single: any[] | undefined;
  view: [number,number] = [600, 300];
  height: number = 400;
  width: number = 400;
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Architecture pattern';
  showYAxisLabel: boolean = false;
  xAxisLabel: string = '# Scenarios';
  scenarioList: any = [];
  greenLight = false;
  yellowLight = false;
  redLight = false;

  cumulatedimplementedPattern1 = this.assessmentService.cumulatedimplementedPattern1;
  cumulatedimplementedPattern2 = this.assessmentService.cumulatedimplementedPattern2;
  cumulatedimplementedPattern3 = this.assessmentService.cumulatedimplementedPattern3;
  
  cumulatedpreferredPattern1 = this.assessmentService.cumulatedpreferredPattern1;
  cumulatedpreferredPattern2 = this.assessmentService.cumulatedpreferredPattern2;
  cumulatedpreferredPattern3 = this.assessmentService.cumulatedpreferredPattern3;

  n=0;

  implementedGraph: any[] = [];
  preferredGraph: any[] = [];
  loadedonce = false;

  deletingStrategicGoalsList = new Array<StrategicGoals>();
  newStrategicGoalsList = new Array<StrategicGoals>();
  updatingStrategicGoalsList = new Array<StrategicGoals>();

  constructor(
    
    public AssessmentComponent: AssessmentComponent,
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService,
    public assessmentService: AssessmentService

  ) {
    this.enumKeys = Object.keys(this.languages);
    this.enumKeys2 = Object.keys(this.patterns);
  }

  ngOnInit(): void {
    this.implementedGraph = [
      {
        "name": "Monolith",
        "value": this.assessmentService.cumulatedimplementedPattern1
      },
      {
        "name": "Microservices",
        "value": this.assessmentService.cumulatedimplementedPattern2
      },
      {
        "name": "Other",
        "value": this.assessmentService.cumulatedimplementedPattern3
      }
    ];
  
    this.preferredGraph = [
      {
        "name": "Monolith",
        "value": this.assessmentService.cumulatedpreferredPattern1
      },
      {
        "name": "Microservices",
        "value": this.assessmentService.cumulatedpreferredPattern2
      },
      {
        "name": "Other",
        "value": this.assessmentService.cumulatedpreferredPattern3
      }
    ];

    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.projectService.requestScenarios(),
    ]).then(() => {
      this.scenarioList = this.projectService.scenarios.value;
      for (let i = 0; i < this.scenarioList.length; i++) {
        if (this.scenarioList[i] !== undefined) {
        this.scenarioList[i].implementedPattern = JSON.parse(this.scenarioList[i].implementedPattern);
        }
    }
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign(
        [],
        this.strategicGoalsList
      );
      if (this.loadedonce == false) {
        this.loadedonce = true;
      }
      this.isDataLoading = false;
    });
  }

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
 
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

   summarylogger(){
    this.recommendation();
     this.projectService.requestScenarios(); // Assuming requestScenarios returns a Promise

    this.scenarioList = this.projectService.scenarios.value;
    for (let i = 0; i < this.scenarioList.length; i++) {
      if (this.scenarioList[i] !== undefined) {
        try {
          this.scenarioList[i].implementedPattern = JSON.parse(this.scenarioList[i].implementedPattern);
        } catch (e) {
          console.error('Error parsing implementedPattern', e);
          // Handle parsing error appropriately
        }
      }
    }
    //this.assessmentService.updateValueOccurrencesImplementedPattern();
    //this.assessmentService.updateValueOccurrencesPreferredPattern();
    this.assessmentService.updateValueOccurrencesImplementedPattern3(this.scenarioList);
    this.assessmentService.updateValueOccurrencesPreferredPattern4(this.scenarioList);
    //if(this.assessmentComponent != undefined){
      //this.assessmentComponent.updateValueOccurrencesImplementedPattern();
      //this.assessmentComponent.updateValueOccurrencesPreferredPattern();
    //}
    console.log(this.implementedGraph[0].value);
    this.implementedGraph[0].value = this.assessmentService.cumulatedimplementedPattern1; // Update 'Monolith'
    console.log(this.implementedGraph[1].value);
    this.implementedGraph[1].value = this.assessmentService.cumulatedimplementedPattern2; // Update 'Microservices'
    console.log(this.implementedGraph[2].value);
    this.implementedGraph[2].value =  this.assessmentService.cumulatedimplementedPattern3; // Update 'Other'

    this.preferredGraph[0].value = this.assessmentService.cumulatedpreferredPattern1; // Update 'Monolith'
    this.preferredGraph[1].value = this.assessmentService.cumulatedpreferredPattern2; // Update 'Microservices'
    this.preferredGraph[2].value = this.assessmentService.cumulatedpreferredPattern3; // Update 'Other'
  /*  if((this.assessmentService.cumulatedpreferredPattern1&&this.assessmentService.cumulatedpreferredPattern2&&this.assessmentService.cumulatedpreferredPattern3//use values of imported graph
      &&this.assessmentService.cumulatedimplementedPattern1&&this.assessmentService.cumulatedimplementedPattern2&&this.assessmentService.cumulatedimplementedPattern3)==0){
        this.importedGraph();
      }*/
      
  }

  /*importedGraph(){

    this.implementedGraph[0].value = this.assessmentService.newValue1;
    this.assessmentService.cumulatedimplementedPattern1 = this.assessmentService.newValue1;

    this.implementedGraph[1].value = this.assessmentService.newValue2; // Update 'Microservices'
    this.assessmentService.cumulatedimplementedPattern2 = this.assessmentService.newValue2;

    this.implementedGraph[2].value =  this.assessmentService.newValue3; // Update 'Other'
    this.assessmentService.cumulatedimplementedPattern3 = this.assessmentService.newValue3;

    this.preferredGraph[0].value = this.assessmentService.newValue4; // Update 'Monolith'
    this.assessmentService.cumulatedpreferredPattern1 = this.assessmentService.newValue4;

    this.preferredGraph[1].value = this.assessmentService.newValue5; // Update 'Microservices'
    this.assessmentService.cumulatedpreferredPattern2 = this.assessmentService.newValue5;

    this.preferredGraph[2].value = this.assessmentService.newValue6;
    this.assessmentService.cumulatedpreferredPattern3 = this.assessmentService.newValue6; 

  }*/

  /*demo(){
    this.assessmentService.increaseCumulatedImplementedPattern1();
    this.assessmentService.increaseCumulatedImplementedPattern2();  
    this.assessmentService.increaseCumulatedImplementedPattern3();
    this.assessmentService.increaseCumulatedPreferredPattern1();
    this.assessmentService.increaseCumulatedPreferredPattern2();
    this.assessmentService.increaseCumulatedPreferredPattern3();
    this.summarylogger();
    this.recommendation();
  }*/

  recommendation() {
    
    if (this.assessmentService.cumulatedpreferredPattern1>this.assessmentService.cumulatedpreferredPattern2) {
        this.redLight = true;
        this.yellowLight = false;
        this.greenLight = false;
    } if (this.assessmentService.cumulatedpreferredPattern1<this.assessmentService.cumulatedpreferredPattern2) {

      this.greenLight = true;
      this.yellowLight = false;
      this.redLight = false;
    } if (this.assessmentService.cumulatedpreferredPattern1==this.assessmentService.cumulatedpreferredPattern2){
      this.yellowLight = true;
      this.greenLight = false;
      this.redLight = false;
    }
  }

  addEmptyStrategicGoals(): void {

    const emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''
    };

    this.strategicGoalsList.shift();
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.shift();
    this.newStrategicGoalsList.push(emptyStrategicGoals);

  }

  addEmptyStrategicGoals2(){
    this.strategicGoalsList.shift();
  }

  deleteStrategicGoals(strategicGoals: StrategicGoals): void {
    const data: ConfirmDialogData = {
      title: 'Delete Project Description',
      message: `Do you really want to delete the Project Description "${strategicGoals.strategicGoalsId}"?`,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;

          if (strategicGoals.strategicGoalsId != null) {
            this.deletingStrategicGoalsList.push(strategicGoals);
          }

          const indexList =
            this.strategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexList != -1) {
            this.strategicGoalsList.splice(indexList, 1);
          }
          this.selectedStrategicGoals = undefined;

          const indexUpdate =
            this.updatingStrategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexUpdate !== -1) {
            this.updatingStrategicGoalsList.splice(indexUpdate, 1);
          }
          const indexNext =
            this.newStrategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexNext !== -1) {
            this.newStrategicGoalsList.splice(indexNext, 1);
          }
        }
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  strategicGoalsSelected(strategicGoals: StrategicGoals): void {
    this.selectedStrategicGoals = strategicGoals;
  }
  checkCurrentStrategicGoals(currentStrategicGoals?: StrategicGoals): boolean {
    if (currentStrategicGoals === this.selectedStrategicGoals) {
      return true;
    } else {
      return false;
    }
  }

  allNamesSet(): boolean {
    return !this.strategicGoalsList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  createAll() {
    if (this.newStrategicGoalsList.length > 0) {
      this.newStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .addStrategicGoals({
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Project Description could not be created.'
              );
            }
          });
      });
      this.newStrategicGoalsList.splice(0);
    }
  }

  deleteAll() {
    if (this.deletingStrategicGoalsList.length > 0) {
      this.deletingStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .deleteStrategicGoals({
            id: e.strategicGoalsId!
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
      });
      this.deletingStrategicGoalsList.splice(0);
    }
  }

  updateAll() {
    if (this.updatingStrategicGoalsList.length > 0) {
      this.updatingStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .updateStrategicGoals({
            id: e.strategicGoalsId!,
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Project Description could not be updated.'
              );
            }
          });
      });
      this.updatingStrategicGoalsList.splice(0);
    }
  }

  saveChanges() {
    const data: ConfirmDialogData = {
      title: 'Save Changes?',
      message: `Do you really want to save all changes?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;
          this.fireAll();
        }
      });
  }

  fireAll() {
    this.createAll();
    this.deleteAll();
    this.updateAll();
  }
}


            