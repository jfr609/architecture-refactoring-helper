import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-quality-attributes',
  templateUrl: './quality-attributes.component.html',
  styleUrls: ['./quality-attributes.component.css']
})
export class QualityAttributesComponent implements OnInit {
  
  isDataLoading = true;

  constructor(
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.isDataLoading = true;
    this.projectService.requestProjectAttributes().then(() => {
      this.isDataLoading = false;
    });
  }

  drop(event: CdkDragDrop<unknown>) {
  }

}
