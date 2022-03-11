import { Component, OnInit } from '@angular/core';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
import { RecommendationPreset } from '../../../utils/models/recommendation-preset';
import { ApproachRecommendationRequest } from '../../../../../api/repository/models/approach-recommendation-request';
import { lastValueFrom } from 'rxjs';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  constructor(
    private recommendationService: ApproachRecommendationService,
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  searchNewApplicationRecommendations() {
    this.recommendationService
      .createPresetRecommendationRequest(RecommendationPreset.NewApplication)
      .then((value: ApproachRecommendationRequest) => {
        this.requestRecommendationAndNavigate(value);
      });
  }

  searchReBuildRecommendations() {
    this.recommendationService
      .createPresetRecommendationRequest(RecommendationPreset.ReBuild)
      .then((value: ApproachRecommendationRequest) => {
        this.requestRecommendationAndNavigate(value);
      });
  }

  searchReFactorRecommendations() {
    this.recommendationService
      .createPresetRecommendationRequest(RecommendationPreset.ReFactor)
      .then((value: ApproachRecommendationRequest) => {
        this.requestRecommendationAndNavigate(value);
      });
  }

  requestRecommendationAndNavigate(
    approachRecommendationRequest: ApproachRecommendationRequest
  ): void {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        body: approachRecommendationRequest
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations.next(value);
        this.router.navigate(['/recommendation/result']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }
}
