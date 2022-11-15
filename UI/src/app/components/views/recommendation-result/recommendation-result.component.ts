import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
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
import { Router } from '@angular/router';
import { RecommendationPreset } from '../../../../../api/repository/models/recommendation-preset';

@Component({
  selector: 'app-recommendation-result',
  templateUrl: './recommendation-result.component.html',
  styleUrls: ['./recommendation-result.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class RecommendationResultComponent implements OnInit {
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  readonly AttributeEvaluation = AttributeEvaluation;
  columnData: ColumnData[] = [
    {
      columnDef: 'suitability',
      header: 'Suitability',
      isSortColumn: false,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        this.recommendationsService.getSuitabilityDisplayString(
          recommendation.suitabilityScore
        )
    },
    {
      columnDef: 'id',
      header: 'ID',
      isSortColumn: false,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.identifier}`
    },
    {
      columnDef: 'title',
      header: 'Title',
      isSortColumn: false,
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
      columnDef: 'qualityScore',
      header: 'Quality Score',
      isSortColumn: false,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.qualityScore.selectedAttributes} / ${recommendation.qualityScore.totalAttributes}`
    },
    {
      columnDef: 'systemPropertiesScore',
      header: 'System Property Score',
      isSortColumn: false,
      isActionColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
      `${recommendation.systemPropertiesScore.selectedAttributes} / ${recommendation.systemPropertiesScore.totalAttributes}`
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

  recommendations: ApproachRecommendation[] = [];
  dataSource!: MatTableDataSource<ApproachRecommendation>;
  expandedRecommendation: ApproachRecommendation | undefined | null;

  showAllActive = false;

  constructor(
    private recommendationsService: ApproachRecommendationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecommendations(10);
    this.setDataSource();
  }

  loadRecommendations(numberOfRecommendations: number): void {
    this.showAllActive =
      numberOfRecommendations < 0 ||
      numberOfRecommendations >=
        this.recommendationsService.recommendations.length;
    if (this.showAllActive) {
      this.recommendations = this.recommendationsService.recommendations;
    } else {
      this.recommendations = this.recommendationsService.recommendations.slice(
        0,
        numberOfRecommendations
      );
    }
    this.refreshDataSource();
  }

  setDataSource(): void {
    this.refreshDataSource();
    this.dataSource.sortingDataAccessor = (
      data: ApproachRecommendation,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'suitability':
          return data.suitabilityScore;
        case 'id':
          return data.identifier;
        case 'title':
          return data.approachSource.title;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.recommendations);
  }

  openRecommendationView(recommendation: ApproachRecommendation) {
    this.router.navigate(
      ['/phase/2/approach', recommendation.refactoringApproachId],
      {
        queryParams: { from: 'recommendation' }
      }
    );
  }

  getTitle(): string {
    switch (this.recommendationsService.selectedPreset) {
      case RecommendationPreset.NewApplication:
        return 'new applications';
      case RecommendationPreset.ReBuild:
        return 'rebuilding applications';
      case RecommendationPreset.ReFactor:
        return 'refactoring applications';
      default:
        return 'your configuration';
    }
  }

  getSuitabilityColor(
    recommendation: ApproachRecommendation,
    columnDef: string
  ): string {
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

  setExpandedRecommendation(recommendation: ApproachRecommendation) {
    if (recommendation === this.expandedRecommendation) {
      this.expandedRecommendation = undefined;
    } else {
      this.expandedRecommendation = recommendation;
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
