import {Component, OnInit} from '@angular/core';
import {RefactoringApproach} from "../../../../../api/repository/models/refactoring-approach";
import {RefactoringApproachService} from "../../../../../api/repository/services/refactoring-approach.service";
import {UtilService} from "../../../services/util.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-approach-explorer',
  templateUrl: './approach-explorer.component.html',
  styleUrls: ['./approach-explorer.component.scss']
})
export class ApproachExplorerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'year', 'authors', 'link'];
  dataSource!: MatTableDataSource<RefactoringApproach>;

  refactoringApproaches: RefactoringApproach[] = [];

  constructor(private refactoringApproachService: RefactoringApproachService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.requestRefactoringApproaches();
  }

  requestRefactoringApproaches(): void {
    this.refactoringApproachService.listRefactoringApproaches().subscribe({
      next: (response: RefactoringApproach[]) => {
        this.refactoringApproaches = response;
        this.dataSource = new MatTableDataSource(this.refactoringApproaches)
      },
      error: () => {
        this.utilService.callSnackBar('Error: Refactoring approaches could not be retrieved.');
      }
    });
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
