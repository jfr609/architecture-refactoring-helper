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

  displayedColumns: string[] = ['suitability', 'id', 'title', 'authors'];
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

  getColumnData(
    recommendation: ApproachRecommendation,
    column: string
  ): unknown {
    switch (column) {
      case 'suitability':
        return recommendation.suitabilityScore + '%';
      case 'id':
        return recommendation.refactoringApproachId;
      case 'title':
        return recommendation.approachSource.title;
      case 'authors':
        return recommendation.approachSource.authors;
      default:
        return recommendation;
    }
  }

  getColumnHeader(column: string) {
    switch (column) {
      case 'suitability':
        return 'Suitability';
      case 'id':
        return 'ID';
      case 'title':
        return 'Title';
      case 'authors':
        return 'Authors';
      default:
        return 'Unknown';
    }
  }

  goToEdit(recommendation: ApproachRecommendation) {
    console.log('Maybe remove?', recommendation.refactoringApproachId);
  }

  goToLink(recommendation: ApproachRecommendation) {
    if (recommendation.approachSource?.link == null) return;
    window.open(recommendation.approachSource?.link, '_blank');
  }

  openRecommendationView(recommendation: ApproachRecommendation) {
    console.log('Maybe remove?', recommendation.refactoringApproachId);
  }

  getSuitabilityColor(recommendation: ApproachRecommendation, column: string) {
    if (column !== 'suitability') {
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
