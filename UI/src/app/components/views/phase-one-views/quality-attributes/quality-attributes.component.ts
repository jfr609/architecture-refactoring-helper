import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  RatingLevel,
  Scenario
} from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-quality-attributes',
  templateUrl: './quality-attributes.component.html',
  styleUrls: ['./quality-attributes.component.css']
})
export class QualityAttributesComponent implements OnInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  scenarioList: any = [];
  selectedScenario?: Scenario;
  qualityList: any = [];
  readonly QualityCategories = QualityCategory;
  indeterminateList = new Array<Quality>();
  deletingScenariosList = new Array<Scenario>();
  newScenariosList = new Array<Scenario>();
  updatingScenariosList = new Array<Scenario>();
  k = 0;

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public scenarioService: ScenarioService,
    public utilService: UtilService
  ) {
    this.enumKeys = Object.keys(this.ratingLevel);
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestProjectAttributes(),
      this.attributesService.requestQualities()
    ]).then(() => {
      this.scenarioList = this.projectService.scenarios.value;
      this.updatingScenariosList = [...this.scenarioList];//was it this?
      this.qualityList = this.attributesService.getQualitiesByCategory(
        this.QualityCategories.Attribute
      );
      this.isDataLoading = false;
    });
  }

  addEmptyScenario(): void {
    let emptyScenario: Scenario = {
      scenarioId: this.counter(this.k),
      name: '',
      description: '',
      qualities: [],
      qualitySublevels: [],
    };
    this.scenarioList.push(emptyScenario);
    this.newScenariosList.push(emptyScenario);
  }

  counter(k: number): number {
    k++;
    this.k = k;
    return this.k;
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

  addOrRemoveQualitySub(selected: boolean, qa: QualitySublevel) {
    if (selected) {
      if (
        !this.selectedScenario?.qualitySublevels?.find(
          (e) => e.name === qa.name
        )
      ) {
        this.selectedScenario?.qualitySublevels?.push(qa);
      }
    } else {
      let index =
        this.selectedScenario?.qualitySublevels?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedScenario?.qualitySublevels?.splice(index, 1);
      }
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

  checkOrUncheckAll(selected: boolean, qa: Quality) {
    if (qa.qualitySublevels) {
      for (let sqa of qa.qualitySublevels) {
        this.addOrRemoveQualitySub(selected, sqa);
      }
    }
  }

  allNamesSet(): boolean {
    return !this.scenarioList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  createAll() {
    if (this.newScenariosList.length > 0) {
      //this.scenarioList.reverse();
      //this.newScenariosList.reverse();
      this.newScenariosList.forEach((e) => {
        this.scenarioService
          .addScenario({
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
      console.log(this.newScenariosList);
      this.newScenariosList.splice(0);
    }
  }

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
              this.utilService.callSnackBar('Scenario could not be deleted.');
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
              this.utilService.callSnackBar('Scenario could not be updated.');
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
      }
    );
  }

  fireAll() {
    this.createAll();
    this.deleteAll();
    this.updateAll();
  }
}
