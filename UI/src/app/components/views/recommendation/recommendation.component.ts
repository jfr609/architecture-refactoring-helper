import { Component, OnInit } from '@angular/core';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
import { lastValueFrom } from 'rxjs';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { RecommendationPreset } from '../../../../../api/repository/models/recommendation-preset';

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
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.NewApplication
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations.next(value);
        this.router.navigate(['/stage/2/recommendation/result']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }

  searchReBuildRecommendations() {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.ReBuild
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations.next(value);
        this.router.navigate(['/stage/2/recommendation/result']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }

  searchReFactorRecommendations() {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.ReFactor
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations.next(value);
        this.router.navigate(['/stage/2/recommendation/result']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }
}
