import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AttributeEvaluation, ApproachRecommendation, RecommendationPreset, ArchitecturalDesignRecommendationRequest, RecommendationSuitability } from 'api/repository/models';
import { ArchitecturalDesignRecommendation } from 'api/repository/models/architectural-design-recommendation';
import { ArchitecturalDesignService } from 'api/repository/services';
import { lastValueFrom, Subscription } from 'rxjs';
import { MODES, SCORE_HIGH, SCORE_LOW, SCORE_MAX, SCORE_MEDIUM, SCORE_VERY_LOW } from 'src/app/app.constants';
import { ApproachRecommendationService } from 'src/app/services/approach-recommendation.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-architectural-recommendation-result',
  templateUrl: './architectural-recommendation-result.component.html',
  styleUrls: ['./architectural-recommendation-result.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ArchitecturalRecommendationResultComponent implements OnInit {
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  categorySelected: string = 'Pattern';
  readonly AttributeEvaluation = AttributeEvaluation;
  columnData: ColumnData[] = [
    {
      columnDef: 'matches',
      header: 'Matches',
      isSortColumn: true,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.matchesCount} / ${recommendation.totalIncludeCount}`
    },
    {
      columnDef: 'id',
      header: 'ID',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.identifier}`
    },
    {
      columnDef: 'name',
      header: 'Name',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.architecturalDesignSource.name}`
    },
    {
      columnDef: 'source',
      header: 'Source',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.architecturalDesignSource.source}`
    },
    {
      columnDef: 'qualityScore',
      header: 'QA Matches',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.qualityScore.selectedAttributes} / ${recommendation.qualityScore.totalAttributes}`
    },
    {
      columnDef: 'systemPropertiesScore',
      header: 'SP Matches',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: false,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
        `${recommendation.systemPropertiesScore.selectedAttributes} / ${recommendation.systemPropertiesScore.totalAttributes}`
    },
    {
      columnDef: 'totalScore',
      header: 'Tendency',
      isSortColumn: false,
      isActionColumn: false,
      isScoreColumn: true,
      cell: (recommendation: ArchitecturalDesignRecommendation) =>
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

  recommendations: ArchitecturalDesignRecommendation[] = [];
  dataSource!: MatTableDataSource<ArchitecturalDesignRecommendation>;
  expandedRecommendation: ArchitecturalDesignRecommendation | undefined | null;

  showAllActive = false;

  sub!: Subscription;

  scenarioBased = false;

  showInfoBool: boolean = false;

  constructor(
    public recommendationsService: ApproachRecommendationService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private architecturalService: ArchitecturalDesignService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    Promise.all([
      (this.sub = this.route.params.subscribe((params) => {
        if (params['mode'] == MODES.modeScenario) this.scenarioBased = true;
      })),
      this.projectService.requestProjectAttributes()
    ]).then(() => {
      this.recommendationsService.setRecommendationInformationSuitability(
        RecommendationSuitability.Neutral
      );
      if (this.scenarioBased) {
        this.projectService.setQualitiesFromScenarios();
      }
      this.onSearchRecommendation();
      this.utilService.setSideNavScenarioBased(this.scenarioBased);
      this.utilService.openSideNav();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.utilService.closeSideNav();
    if (this.scenarioBased) {
      this.recommendationsService.setQualitiesToNeutral();
    }
  }

  showInfo() {
    this.showInfoBool = !this.showInfoBool;
  }

  loadRecommendations(numberOfRecommendations: number): void {
    this.showAllActive =
      numberOfRecommendations < 0 ||
      numberOfRecommendations >=
        this.recommendationsService.recommendations.length;
    if (this.showAllActive) {
      this.recommendations = this.recommendationsService.designRecommendations;
    } else {
      this.recommendations =
        this.recommendationsService.designRecommendations.slice(
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
      data: ArchitecturalDesignRecommendation,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'matches':
          return data.matchesCount;
        case 'id':
          return data.identifier;
        case 'name':
          return data.architecturalDesignSource.name;
        case 'source':
          return data.architecturalDesignSource.source;
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
    this.dataSource.filter = this.categorySelected;
  }

  openRecommendationView(recommendation: ArchitecturalDesignRecommendation) {
    this.router.navigate(
      ['/phase/3/architecturalDesigns', recommendation.architecturalDesignId],
      {
        queryParams: { from: 'recommendation' }
      }
    );
  }

  getSuitabilityColor(
    recommendation: ArchitecturalDesignRecommendation,
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

  getScoreIconStyle(score: number, columnDef: string): string {
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

  setExpandedRecommendation(recommendation: ArchitecturalDesignRecommendation) {
    if (recommendation === this.expandedRecommendation) {
      this.expandedRecommendation = undefined;
    } else {
      this.expandedRecommendation = recommendation;
    }
  }

  onSearchRecommendation(): void {
    const architecturalRecommendationRequest: ArchitecturalDesignRecommendationRequest =
      this.recommendationsService.createDesignRecommendationRequest();

    lastValueFrom(
      this.architecturalService.recommendArchitecturalDesigns({
        body: architecturalRecommendationRequest
      })
    )
      .then((value: ArchitecturalDesignRecommendation[]) => {
        this.recommendationsService.designRecommendations = value;
        this.loadRecommendations(10);
        this.setDataSource();
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended architecural designs failed.'
        );
      });
  }
}

export interface ColumnData {
  columnDef: string;
  header: string;
  isSortColumn: boolean;
  isActionColumn: boolean;
  isScoreColumn: boolean;
  cell: (recommendation: ArchitecturalDesignRecommendation) => string;
}
