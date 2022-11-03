import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  RatingLevel,
  Scenario
} from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
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

  deletingScenariosList = new Array<Scenario>();
  newScenariosList = new Array<Scenario>();
  updatingScenariosList = new Array<Scenario>();

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
      this.qualityList = this.attributesService.getQualitiesByCategory(
        this.QualityCategories.Requirement
      );
      this.isDataLoading = false;
    });
  }

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
    if (!this.newScenariosList.includes(scenario)) {
      this.deletingScenariosList.push(scenario);
    }

    let index = this.scenarioList.indexOf(scenario) ?? -1;
    if (index !== -1) {
      this.scenarioList.splice(index, 1);
    }
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
      this.selectedScenario?.qualities?.push(qa);
    } else {
      let index =
        this.selectedScenario?.qualities?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedScenario?.qualities?.splice(index, 1);
      }
    }

    console.log(this.selectedScenario);
  }

  addOrRemoveQualitySub(selected: boolean, qa: QualitySublevel) {
    if (selected) {
      this.selectedScenario?.qualitySublevels?.push(qa);
    } else {
      let index =
        this.selectedScenario?.qualitySublevels?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedScenario?.qualitySublevels?.splice(index, 1);
      }
    }

    console.log(this.selectedScenario);
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
      quality.qualitySubLevels?.every((e) =>
        this.selectedScenario?.qualitySublevels?.some((q) => e.name === q.name)
      ) ?? false
    );
  }

  checkOrUncheckAll(selected: boolean, qa: Quality) {
    if (qa.qualitySubLevels) {
      for (let sqa of qa.qualitySubLevels) {
        console.log(sqa.name);
        this.addOrRemoveQualitySub(selected, sqa);
      }
    }
  }

  createAll() {
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
  }

  deleteAll() {
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
  }

  fireAll(){
    this.createAll();
    this.deleteAll();
  }
}
