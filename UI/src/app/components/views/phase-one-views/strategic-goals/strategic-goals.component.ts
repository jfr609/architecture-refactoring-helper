import { Component, Injectable, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { FormControl, Validators } from '@angular/forms';
import {
  RatingLevel
} from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
 
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  Scenario
} from 'api/repository/models';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
//import { SelectStrategicGoalDialogComponent, SelectStrategicGoalDialogData } from 'src/app/components/dialogs/select-strategicgoals-dialog/select-strategicgoals-dialog.component';
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
import { GoalsType } from 'api/repository/models/goals-type';
import { Objectives } from 'api/repository/models/objectives';
@Component({
  selector: 'app-strategic-goals',
  templateUrl: './strategic-goals.component.html',
  styleUrls: ['./strategic-goals.component.css']
})
@Injectable()
export class StrategicGoalsComponent implements OnInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  enumKeys2: any;
  enumKeys3: any;
  enumKeys4: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  objectivesList: any = [];
  selectedStrategicGoals?: StrategicGoals;
  objectives?: Objectives;
  goalstype = GoalsType;
  loadedonce = false;
   k =-1;//id counter for objectives
   selectedScenario?: Scenario;
 
   scenarioList: any = [];

 
   qualityList: any = [];
   readonly QualityCategories = QualityCategory;
   indeterminateList = new Array<Quality>();
 
   deletingScenariosList = new Array<Scenario>();
   newScenariosList = new Array<Scenario>();
   updatingScenariosList = new Array<Scenario>();

  deletingStrategicGoalsList = new Array<StrategicGoals>();
  newStrategicGoalsList = new Array<StrategicGoals>();
  newObjectivesList = new Array<Objectives>();
  updatingStrategicGoalsList = new Array<StrategicGoals>();

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService

  ) { 
    this.enumKeys3 = Object.keys(this.goalstype);
    this.enumKeys4 = Object.keys(this.patterns);
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.attributesService.requestQualities(),
      this.projectService.requestProjectGoalsAttributes(),

    ]).then(() => {
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
      //this.qualityList = this.attributesService.getQualitiesByCategory(
      //this.QualityCategories.Attribute
      //);
      this.isDataLoading = false;
    });
  }
  
  addEmptyStrategicGoals(): void {
    let emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''

    };
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.push(emptyStrategicGoals);
  }
  addObjectives(): void {
    let emptyObjectives: Objectives = {
      objectiveId:  this.counter(this.k),
      objective: '',
      
    };
    this.objectivesList.push(emptyObjectives);
    this.newObjectivesList.push(emptyObjectives);
  }
  counter(k: number): number {
    k++;
    this.k = k;
    return this.k;
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


  deleteObjectives(strategicGoals: StrategicGoals): void {
    const data: ConfirmDialogData = {
      title: 'Delete Project Description',
      message: `Do you really want to delete the Project Description "${strategicGoals.strategicGoalsId}"?`,
      //selectBusinessType: this.enumKeys,
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



  deleteStrategicGoals(strategicGoals: StrategicGoals): void {
    const data: ConfirmDialogData = {
      title: 'Delete Project Description',
      message: `Do you really want to delete the Strategic Goal "${strategicGoals.strategicGoalsId}"?`,
      //selectBusinessType: this.enumKeys,
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


  objectivesSelected(objectives: Objectives): void {
    this.objectives = objectives;
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
              this.utilService.callSnackBar('Project Description could not be created.');
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
              this.utilService.callSnackBar('Project Description could not be deleted.');
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
              this.utilService.callSnackBar('Project Description could not be updated.');
            }
          });
      });
      this.updatingStrategicGoalsList.splice(0);
    }
  }

  saveChanges(){
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

