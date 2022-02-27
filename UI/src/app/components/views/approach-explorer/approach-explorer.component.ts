import { Component, OnInit, ViewChild } from '@angular/core';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-approach-explorer',
  templateUrl: './approach-explorer.component.html',
  styleUrls: ['./approach-explorer.component.scss']
})
export class ApproachExplorerComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'title', 'year', 'authors', 'actions'];
  dataSource!: MatTableDataSource<RefactoringApproach>;

  refactoringApproaches: RefactoringApproach[] = [];

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestRefactoringApproaches();
  }

  requestRefactoringApproaches(): void {
    this.refactoringApproachService.listRefactoringApproaches().subscribe({
      next: (response: RefactoringApproach[]) => {
        this.refactoringApproaches = response;
        this.setDataSource();
      },
      error: () => {
        this.utilService.callSnackBar(
          'Error: Refactoring approaches could not be retrieved.'
        );
      }
    });
  }

  setDataSource(): void {
    this.dataSource = new MatTableDataSource(this.refactoringApproaches);
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'id':
          return data.refactoringApproachId;
        case 'title':
          return data.approachSource?.title;
        case 'year':
          return data.approachSource?.year;
        case 'authors':
          return data.approachSource?.authors;
        default:
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
    this.dataSource.sort = this.sort;
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }

  goToEdit(refactoringApproachId: number) {
    this.router.navigate(['/approach', refactoringApproachId, 'edit']);
  }
}
