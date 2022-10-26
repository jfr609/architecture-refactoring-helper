import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RatingLevel, Scenario } from 'api/repository/models';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service'
import { FlatTreeControl } from '@angular/cdk/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

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

  constructor(public projectService: ProjectService, public attributesService: AttributeOptionsService) {
    this.enumKeys = Object.keys(this.ratingLevel);
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    this.projectService.requestProjectAttributes().then(() => {
      this.scenarioList = this.projectService.scenarios.value;
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
}
