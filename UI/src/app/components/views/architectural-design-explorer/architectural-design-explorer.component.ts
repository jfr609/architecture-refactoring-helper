import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArchitecturalCategory, ArchitecturalDesign, RefactoringApproach } from 'api/repository/models';
import { ArchitecturalDesignService, RefactoringApproachService } from 'api/repository/services';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-architectural-design-explorer',
  templateUrl: './architectural-design-explorer.component.html',
  styleUrls: ['./architectural-design-explorer.component.scss']
})
export class ArchitecturalDesignExplorerComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'description',
    'source',
    'actions'
  ];
  readonly ArchitecturalCategory = ArchitecturalCategory;
  dataSource!: MatTableDataSource<ArchitecturalDesign>;
  categorySelected: string = 'Pattern';
  architecturalDesigns: ArchitecturalDesign[] = [];

  constructor(
    private architecturalDesignSercvice: ArchitecturalDesignService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestArchitecturalDesigns();
  }

  requestArchitecturalDesigns(): void {
    this.architecturalDesignSercvice.listArchitecturalDesigns().subscribe({
      next: (response: ArchitecturalDesign[]) => {
        this.architecturalDesigns = response;
        this.setDataSource();
        console.log(response);
      },
      error: () => {
        this.utilService.callSnackBar(
          'Error: Architectural designs could not be retrieved.'
        );
      }
    });
  }

  setDataSource(): void {
    this.refreshDataSource();
    this.dataSource.sortingDataAccessor = (
      data: ArchitecturalDesign,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'id':
          return data.identifier;
        case 'name':
          return data.architecturalDesignSource?.name;
        case 'description':
          return data.architecturalDesignSource?.description;
        case 'source':
          return data.architecturalDesignSource?.source;
        case 'category':
          return data.category.toString();
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
    this.dataSource.sort = this.sort;
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.architecturalDesigns);
    this.dataSource.filter = this.categorySelected;
  }

  goToLink(
    architecturalDesign: ArchitecturalDesign,
    mouseEvent: MouseEvent
  ): void {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    if (architecturalDesign.architecturalDesignSource?.link == null) return;
    window.open(architecturalDesign.architecturalDesignSource?.link, '_blank');
  }

  openArchitecturalDesignView(architecturalDesign: ArchitecturalDesign) {
    this.router.navigate([
      '/phase/3/architecturalDesigns',
      architecturalDesign.architecturalDesignId
    ]);
  }
}
