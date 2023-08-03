import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { FormControl, Validators } from '@angular/forms';
import {
  RatingLevel,
  
} from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
import { Languages } from 'api/repository/models/languages';
import { Patterns } from 'api/repository/models/patterns';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { StrategicGoals } from 'api/repository/models';
import { Assessment } from 'api/repository/models/assessment';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  Scenario
} from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
//import {AssessmentService} from 'api/repository/services/';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements AfterViewInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  enumKeys2: any;
  enumKeys3: any;
  enumKeys1: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  assessmentList:any = [];
  assessment:any = [];
  selectedAssessment?: Assessment;
  selectedAssessmentList= new Array<Assessment>();
  deletingAssessmentList = new Array<Assessment>();
  newAssessmentList = new Array<Assessment>();
  updatingAssessmentList = new Array<Assessment>();

  currentSelectedscenario: any = [];


  selectedStrategicGoals?: StrategicGoals;

  loadedonce = false;
  scenarioList: any = [];
  selectedScenario?: Scenario;

  qualityList: any = [];
  readonly QualityCategories = QualityCategory;
  indeterminateList = new Array<Quality>();

  deletingScenariosList = new Array<Scenario>();
  newScenariosList = new Array<Scenario>();
  updatingScenariosList = new Array<Scenario>();



  deletingStrategicGoalsList = new Array<StrategicGoals>();
  newStrategicGoalsList = new Array<StrategicGoals>();
  updatingStrategicGoalsList = new Array<StrategicGoals>();

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService,
    public scenarioService: ScenarioService,
    //public assessmentService: AssessmentService

  ) { 
    this.enumKeys1 = Object.keys(this.ratingLevel);
    this.enumKeys = Object.keys(this.languages);
    this.enumKeys2 = Object.values(this.patterns);
    this.enumKeys3 = Object.values(this.patterns);


  }

  ngAfterViewInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.projectService.requestProjectAttributes(),
      this.attributesService.requestQualities(),
      this.projectService.requestScenarios(),

      //this.
    ]).then(() => {
      this.scenarioList = this.projectService.scenarios.value;
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
      this.qualityList = this.attributesService.getQualitiesByCategory(
      this.QualityCategories.Attribute
      );
      this.isDataLoading = false;
    });
  }
  
  /*addEmptyStrategicGoals(): void {
    let emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''

    };
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.push(emptyStrategicGoals);
  }*/
  addEmptyStrategicGoals(): void {
    let emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''

    };
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.push(emptyStrategicGoals);
  }
  /*addObjectives(): void {
    let emptyObjective: Objectives = {
      objectiveId: counter(this.k),
      objective: '',
      
    };
    this.objectivesList.push(emptyObjective);
    this.newObjectivesList.push(emptyObjective);
  }*/

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
      next:(data: ConfirmDialogData) => {
        if(data == null) return;

        if(strategicGoals.strategicGoalsId != null){
          this.deletingStrategicGoalsList.push(strategicGoals);
        }

        let indexList = this.strategicGoalsList.indexOf(strategicGoals) ?? -1;
        if(indexList != -1){
          this.strategicGoalsList.splice(indexList, 1);
        }
        this.selectedStrategicGoals = undefined;

        let indexUpdate = this.updatingStrategicGoalsList.indexOf(strategicGoals) ?? -1;
        if(indexUpdate !== -1){
          this.updatingStrategicGoalsList.splice(indexUpdate, 1);
        }
        let indexNext = this.newStrategicGoalsList.indexOf(strategicGoals) ?? -1;
        if (indexNext !== -1) {

          this.newStrategicGoalsList.splice(indexNext, 1);
        }
      }
    });
  }

  sendTheNewValue(){
    
  }

  strategicGoalsSelected(strategicGoals: StrategicGoals): void {
    this.selectedStrategicGoals = strategicGoals;
  }
  checkCurrentStrategicGoals(currentStrategicGoals?: StrategicGoals): boolean {
    if(currentStrategicGoals === this.selectedStrategicGoals){
      return true;
    } else {
      return false;
    }
  }

  //injectScenario(): Boolean{
   //return(window.alert("Scenario injected"));
  //}

  addEmptyScenario(): void {
    let emptyScenario: Scenario = {
      name: '',
      description: '',
      qualities: [],
      qualitySublevels: []
    };
    this.scenarioList.push(emptyScenario);
    this.newScenariosList.push(emptyScenario);
  }

  deleteScenario(scenario: Scenario): void {
    const data: ConfirmDialogData = {
      title: 'Delete Scenario?',
      message: `Do you really want to delete the scenario "${scenario.name}"?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;

          if (scenario.scenarioId != null) {
            this.deletingScenariosList.push(scenario);
          }

          let indexList = this.scenarioList.indexOf(scenario) ?? -1;
          if (indexList !== -1) {
            this.scenarioList.splice(indexList, 1);
          }
          this.selectedScenario = undefined;

          let indexUpdate = this.updatingScenariosList.indexOf(scenario) ?? -1;
          if (indexUpdate !== -1) {
            this.updatingScenariosList.splice(indexUpdate, 1);
          }
          let indexNew = this.newScenariosList.indexOf(scenario) ?? -1;
          if (indexNew !== -1) {
            this.newScenariosList.splice(indexNew, 1);
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

  scenarioSelected(scenario: Scenario): void {
    this.selectedScenario = scenario;
  }

  checkCurrentScenario(currentScenario?: Scenario): boolean {
    if (currentScenario === this.selectedScenario) {
      return true;
    } else {
      return false;
    }
  }

  addOrRemoveQuality(selected: boolean, qa: Quality) {
    if (selected) {
      if (!this.selectedScenario?.qualities?.find((e) => e.name === qa.name)) {
        this.selectedScenario?.qualities?.push(qa);
      }
    } else {
      let index =
        this.selectedScenario?.qualities?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedScenario?.qualities?.splice(index, 1);
      }
    }
  }

  addOrRemoveScenarioForAssessment(selected: boolean, qa: Scenario) {

    this.selectedScenario = qa;
    if (selected) {
        this.selectedScenario.description =qa.description;
        this.selectedScenario.importance =qa.importance;
        this.selectedScenario.difficulty =qa.difficulty;
    } 
    }
  

  checkIfQualityExist(name: string): boolean {
    return (
      this.selectedScenario?.qualities?.some((e) => e.name === name) ?? false
    );
  }

  checkIfQualitySubExist(name: string): boolean {
    return (
      this.selectedScenario?.qualitySublevels?.some((e) => e.name === name) ??
      false
    );
  }

  someChecked(name: string): boolean {
    return (
      this.selectedScenario?.qualitySublevels?.some(
        (e) => e.qualityName === name
      ) ?? false
    );
  }

  allChecked(quality: Quality): boolean {
    return (
      quality.qualitySublevels?.every((e) =>
        this.selectedScenario?.qualitySublevels?.some((q) => e.name === q.name)
      ) ?? false
    );
  }

  selectPattern(selected: Boolean, qa: Scenario): boolean {
    this.currentSelectedscenario = qa;
   return true;
  }



  allNamesSet(): boolean {
    return !this.scenarioList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  /*createAll() {
    if (this.newAssessmentList.length > 0) {
      this.newAssessmentList.forEach((e) => {
        this.assessmentService
          .addAssessment({
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Scenario could not be created.');
            }
          });
      });
      this.newAssessmentList.splice(0);
    }
  }*/

  deleteAll() {
    if (this.deletingScenariosList.length > 0) {
      this.deletingScenariosList.forEach((e) => {
        this.scenarioService
          .deleteScenario({
            id: e.scenarioId!
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Assessment could not be deleted.');
            }
          });
      });
      this.deletingScenariosList.splice(0);
    }
  }

  updateAll() {
    if (this.updatingScenariosList.length > 0) {
      this.updatingScenariosList.forEach((e) => {
        this.scenarioService
          .updateScenario({
            id: e.scenarioId!,
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Assessment could not be updated.');
            }
          });
      });
      this.updatingScenariosList.splice(0);
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
    //this.createAll();
    this.deleteAll();
    this.updateAll();
  }












}