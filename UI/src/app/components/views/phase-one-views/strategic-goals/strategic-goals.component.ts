import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { RatingLevel } from 'api/repository/models';
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
import { StrategicGoals } from 'api/repository/models';
import { GoalsType } from 'api/repository/models/goals-type';
import { Objectives } from 'api/repository/models/objectives';
import { ObjectivesService } from 'api/repository/services/objectives-service';

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
  k = -1; //id counter for objectives
  selectedScenario?: Scenario;
  selectedObjectives?: Objectives;

  scenarioList: any = [];

  qualityList: any = [];
  readonly QualityCategories = QualityCategory;
  indeterminateList = new Array<Quality>();

  deletingScenariosList = new Array<Scenario>();
  deletingObjectivesList = new Array<Objectives>();

  newScenariosList = new Array<Scenario>();
  updatingScenariosList = new Array<Scenario>();

  deletingStrategicGoalsList = new Array<StrategicGoals>();
  deletingObjectives = new Array<Objectives>();

  newStrategicGoalsList = new Array<StrategicGoals>();
  newObjectivesList = new Array<Objectives>();

  updatingStrategicGoalsList = new Array<StrategicGoals>();
  updatingObjectivesList = new Array<Objectives>();

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public objectivesService: ObjectivesService,
    public utilService: UtilService
  ) {
    this.enumKeys3 = Object.values(this.goalstype);
    this.enumKeys4 = Object.keys(this.patterns);
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.attributesService.requestQualities(),
      this.projectService.requestProjectGoalsAttributes(),
      this.projectService.requestObjectivesAttributes()
    ]).then(() => {
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign(
        [],
        this.strategicGoalsList
      );
      this.objectivesList = this.projectService.objectives.value;
      this.updatingObjectivesList = Object.assign([], this.objectivesList);
      //this.qualityList = this.attributesService.getQualitiesByCategory(
      //this.QualityCategories.Attribute
      //);
      this.isDataLoading = false;
    });
  }

  addEmptyStrategicGoals(): void {
    const emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''
    };
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.push(emptyStrategicGoals);
  }
  addObjectives(): void {
    const emptyObjectives: Objectives = {
      objectivesId: this.counter(this.k),
      objectivesName: '',
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

  deleteObjectives(objectives: Objectives): void {
    const data: ConfirmDialogData = {
      title: 'Delete Objective',
      message: `Do you really want to delete Objective "${objectives.objectivesId}"?`,
      //selectBusinessType: this.enumKeys,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;

          if (objectives.objectivesId != null) {
            this.deletingObjectivesList.push(objectives);
          }

          const indexList =
            this.objectivesList.indexOf(objectives) ?? -1;
          if (indexList != -1) {
            this.objectivesList.splice(indexList, 1);
          }
          this.selectedObjectives = undefined;

          const indexUpdate =
            this.updatingObjectivesList.indexOf(objectives) ?? -1;
          if (indexUpdate !== -1) {
            this.updatingStrategicGoalsList.splice(indexUpdate, 1);
          }
          const indexNext =
            this.newObjectivesList.indexOf(objectives) ?? -1;
          if (indexNext !== -1) {
            this.newObjectivesList.splice(indexNext, 1);
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
              this.utilService.callSnackBar(
                'Project Description could not be created.'
              );
            }
          });
      });
      this.newStrategicGoalsList.splice(0);
    }
    if (this.newObjectivesList.length > 0) {
      this.newObjectivesList.forEach((e) => {
        this.objectivesService
          .addObjectives({
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Objective could not be created.'
              );
            }
          });
      });
      this.newObjectivesList.splice(0);
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
                'Strategic Goal could not be deleted.'
              );
            }
          });
      });
      this.deletingStrategicGoalsList.splice(0);
    }
    if (this.deletingObjectivesList.length > 0) {
      this.deletingObjectivesList.forEach((e) => {
        this.objectivesService
          .deleteObjectives({
            id: e.objectivesId!
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Objective could not be deleted.'
              );
            }
          });
      });
      this.newObjectivesList.splice(0);
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
    if (this.updatingObjectivesList.length > 0) {
      this.updatingObjectivesList.forEach((e) => {
        this.objectivesService
          .updateObjectives({
            id: e.objectivesId,
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Objective could not be updated.'
              );
            }
          });
      });
      this.updatingObjectivesList.splice(0);
    }
  }

  saveChanges() {
    const data: ConfirmDialogData = {
      title: 'Save Changes?',
      message: `Do you really want to save all changes?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    /*this.strategicGoalsList[0] = this.strategicGoalsList.method;
    this.strategicGoalsList[1] = this.strategicGoalsList.ownership;
    this.strategicGoalsList[2] = this.strategicGoalsList.participants;
    this.strategicGoalsList[3] = this.strategicGoalsList.objectives;*/
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
