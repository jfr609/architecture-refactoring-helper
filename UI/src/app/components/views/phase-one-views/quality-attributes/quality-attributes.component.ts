import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { QualityCategory, RatingLevel, Scenario } from 'api/repository/models';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service'

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

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService
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
      this.qualityList = this.attributesService.getQualitiesByCategory(this.QualityCategories.Requirement);
      this.isDataLoading = false;
    });
  }

  addEmptyScenario(): void {
    let emptyScenario = <Scenario>{};
    this.scenarioList.push(emptyScenario);
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

  scenarioSelected(scenario: Scenario) : void{
    this.selectedScenario = scenario;
    console.log(scenario);
    console.log(this.selectedScenario);

  }

  checkCurrentScenario(currentScenario?: Scenario) : boolean{
    if (currentScenario === this.selectedScenario) {
      return true;
    } else {
      return false;
    }
  }
}
