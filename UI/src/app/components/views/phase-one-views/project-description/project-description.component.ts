import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';


import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  RatingLevel,
  Scenario,
  ProjectDescription
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
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {

  projectdescriptionList: any = [];
  selectedScenario?: ProjectDescription;

  newprojectdescriptionList = new Array<ProjectDescription>();


  constructor() { }

  ngOnInit(): void {
  }

  addEmptyProjectDescription(): void {
    let emptyProjectDescription: ProjectDescription = {
      systemname: '',//name
      ownership: '',//name/object
      creationdate: '',//date
      systemsize: '',//int
      hosting: '',//name/object
      teams: '',//name/object/id
      developers: '',//name/obect/id/list
      processmodel: '',
      architecturepattern: '',
      languages: '',
      persistence: '',
      purpose: '',
      functionality: '',
      designdiagrams: '',
      //description: '',
      //qualities: [],
      //qualitySublevels: []
    };
    this.projectdescriptionList.push(emptyProjectDescription);
    this.newprojectdescriptionList.push(emptyProjectDescription);
  }
}
