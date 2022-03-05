import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproachRecommendationsService } from '../../../services/approach-recommendations.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AttributeEvaluation } from '../../../../../api/repository/models/attribute-evaluation';
import { RecommendationSuitability } from '../../../../../api/repository/models/recommendation-suitability';

@Component({
  selector: 'app-approach-recommendations',
  templateUrl: './approach-recommendations.component.html',
  styleUrls: ['./approach-recommendations.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ApproachRecommendationsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  attributeEvaluation = AttributeEvaluation;

  columnData: ColumnData[] = [
    {
      columnDef: 'suitability',
      header: 'Suitability',
      isSortColumn: true,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.suitabilityScore}%`
    },
    {
      columnDef: 'id',
      header: 'ID',
      isSortColumn: true,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.refactoringApproachId}`
    },
    {
      columnDef: 'title',
      header: 'Title',
      isSortColumn: true,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.approachSource.title}`
    },
    {
      columnDef: 'authors',
      header: 'Authors',
      isSortColumn: false,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.approachSource.authors}`
    },
    {
      columnDef: 'actions',
      header: 'Actions',
      isSortColumn: false,
      isActionColumn: true,
      cell: () => ''
    },
    {
      columnDef: 'expandState',
      header: '',
      isSortColumn: false,
      isActionColumn: true,
      cell: () => ''
    }
  ];
  displayedColumns = this.columnData.map((c: ColumnData) => c.columnDef);
  sortColumns = this.columnData.filter(
    (c: ColumnData) => c.isSortColumn && !c.isActionColumn
  );
  nonSortColumns = this.columnData.filter(
    (c: ColumnData) => !c.isSortColumn && !c.isActionColumn
  );
  actionColumns = this.columnData.filter((c: ColumnData) => c.isActionColumn);
  dataSource!: MatTableDataSource<ApproachRecommendation>;
  expandedElement: ApproachRecommendation | undefined | null;

  constructor(private recommendationsService: ApproachRecommendationsService) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource(): void {
    this.dataSource = new MatTableDataSource(
      this.recommendationsService.recommendations.value
    );

    this.dataSource.sortingDataAccessor = (
      data: ApproachRecommendation,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'suitability':
          return data.suitabilityScore;
        case 'id':
          return data.refactoringApproachId;
        case 'title':
          return data.approachSource.title;
        case 'authors':
          return data.approachSource.authors;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
    this.dataSource.sort = this.sort;
  }

  goToEdit(recommendation: ApproachRecommendation) {
    console.log('Maybe remove?', recommendation.refactoringApproachId);
  }

  openRecommendationView(recommendation: ApproachRecommendation) {
    console.log('Maybe remove?', recommendation.refactoringApproachId);
  }

  getSuitabilityColor(
    recommendation: ApproachRecommendation,
    columnDef: string
  ) {
    if (columnDef !== 'suitability') {
      return '';
    }

    if (recommendation.suitabilityScore < 50) {
      return 'suitability-low';
    } else if (recommendation.suitabilityScore < 75) {
      return 'suitability-medium';
    } else {
      return 'suitability-high';
    }
  }
}

export interface ColumnData {
  columnDef: string;
  header: string;
  isSortColumn: boolean;
  isActionColumn: boolean;
  cell: (recommendation: ApproachRecommendation) => string;
}
