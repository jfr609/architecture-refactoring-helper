import {Component, OnInit} from '@angular/core';
import {APP_TITLE} from '../../../app.constants';

@Component({
  selector: 'app-architecture-refactoring-helper',
  templateUrl: './architecture-refactoring-helper.component.html',
  styleUrls: ['./architecture-refactoring-helper.component.scss']
})
export class ArchitectureRefactoringHelperComponent implements OnInit {
  applicationTitle = APP_TITLE;

  constructor() { }

  ngOnInit(): void {
  }

}
