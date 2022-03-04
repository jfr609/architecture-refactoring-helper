import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproachRecommendationsService } from '../../../services/approach-recommendations.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';

@Component({
  selector: 'app-approach-recommendations',
  templateUrl: './approach-recommendations.component.html',
  styleUrls: ['./approach-recommendations.component.css']
})
export class ApproachRecommendationsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'suitabilityScore',
    'id',
    'title',
    'year',
    'authors',
    'actions'
  ];
  dataSource!: MatTableDataSource<ApproachRecommendation>;

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
        case 'id':
          return data.refactoringApproachId;
        case 'title':
          return data.approachSource.title;
        case 'year':
          return data.approachSource.year;
        case 'authors':
          return data.approachSource.authors;
        case 'suitabilityScore':
          return data.suitabilityScore;
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

  goToLink(recommendation: ApproachRecommendation) {
    if (recommendation.approachSource?.link == null) return;
    window.open(recommendation.approachSource?.link, '_blank');
  }

  openRecommendationView(recommendation: ApproachRecommendation) {
    console.log('Maybe remove?', recommendation.refactoringApproachId);
  }
}
