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
import { ActivatedRoute, Router } from '@angular/router';
import { RecommendationPreset } from '../../../../../api/repository/models/recommendation-preset';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { SCORE_VERY_LOW, SCORE_LOW, SCORE_MEDIUM, SCORE_HIGH, SCORE_MAX } from 'src/app/app.constants';

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
      columnDef: 'matches',
      header: 'Matches',
      isSortColumn: true,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.matchesCount} / ${recommendation.totalIncludeCount}`
    },
    {
      columnDef: 'id',
      header: 'ID',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.identifier}`
    },
    {
      columnDef: 'title',
      header: 'Title',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.approachSource.title}`
    },
    {
      columnDef: 'authors',
      header: 'Authors',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.approachSource.authors}`
    },
    {
      columnDef: 'qualityScore',
      header: 'QAs',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.qualityScore.selectedAttributes} / ${recommendation.qualityScore.totalAttributes}`
    },
    {
      columnDef: 'systemPropertiesScore',
      header: 'SPs',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ApproachRecommendation) =>
        `${recommendation.systemPropertiesScore.selectedAttributes} / ${recommendation.systemPropertiesScore.totalAttributes}`
    },
    {
      columnDef: 'totalScore',
      header: 'Tendency',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: true,
      cell: (recommendation: ApproachRecommendation) =>
      `${recommendation.totalScore}`
    },
    {
      columnDef: 'actions',
      header: 'Actions',
      isSortColumn: false,
      isActionColumn: true,
      isScoreColumn: false,
      cell: () => ''
    },
    {
      columnDef: 'expandState',
      header: '',
      isSortColumn: false,
      isActionColumn: true,
      isScoreColumn: false,
      cell: () => ''
    }
  ];
  displayedColumns = this.columnData.map((c: ColumnData) => c.columnDef);
  sortColumns = this.columnData.filter(
    (c: ColumnData) => c.isSortColumn && !c.isActionColumn
  );
  nonSortColumns = this.columnData.filter(
    (c: ColumnData) => !c.isSortColumn && !c.isActionColumn && !c.isScoreColumn
  );
  actionColumns = this.columnData.filter((c: ColumnData) => c.isActionColumn);

  scoreColumns = this.columnData.filter((c: ColumnData) => c.isScoreColumn);

  recommendations: ApproachRecommendation[] = [];
  dataSource!: MatTableDataSource<ApproachRecommendation>;
  expandedRecommendation: ApproachRecommendation | undefined | null;

  showAllActive = false;
  
  sub!: Subscription;

  scenarioBased = false;

  constructor(
    public recommendationsService: ApproachRecommendationService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    Promise.all([this.sub = this.route.params.subscribe(params => {
        this.scenarioBased = params['mode'] == 'scenarioBased';
      })]).then(() => {
        this.loadRecommendations(10);
        this.setDataSource();
        this.utilService.openSideNav();
      });
  }

  ngOnDestroy(): void {
    this.utilService.closeSideNav();
    if (this.scenarioBased) {
      this.recommendationsService.setQualitiesToNeutral();
    }
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
    this.setDataSource();
  }

  setDataSource(): void {
    this.refreshDataSource();
    this.dataSource.sortingDataAccessor = (
      data: ApproachRecommendation,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'matches':
          return data.matchesCount;
        case 'id':
          return data.identifier;
        case 'title':
          return data.approachSource.title;
        case 'authors':
          return data.approachSource.authors;
        case 'qualityScore':
          return data.qualityScore.selectedAttributes;
        case 'systemPropertiesScore':
          return data.systemPropertiesScore.selectedAttributes;
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
    if (columnDef !== 'matches') {
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

  getScoreIconStyle(score: number,
    columnDef: string
  ): string {
    if (columnDef !== 'totalScore') {
      return '';
    }
    if (score < SCORE_VERY_LOW) {
      return 'score-very-low';
    } else if (score < SCORE_LOW) {
      return 'score-low';
    } else if (score < SCORE_MEDIUM) {
      return 'score-medium';
    } else if (score < SCORE_HIGH) {
      return 'score-high';
    } else if (score <= SCORE_MAX) {
      return 'score-very-high';
    } else {
      return '';
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
  isScoreColumn: boolean;
  cell: (recommendation: ApproachRecommendation) => string;
}
