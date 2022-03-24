import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { AttributeOptionsService } from '../../../services/attribute-options.service';
import { QualityCategory } from '../../../../../api/repository/models/quality-category';
import { ApproachRecommendationRequest } from '../../../../../api/repository/models/approach-recommendation-request';
import { RecommendationSuitability } from '../../../../../api/repository/models/recommendation-suitability';
import { ThemePalette } from '@angular/material/core';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recommendation-configurator',
  templateUrl: './recommendation-configurator.component.html',
  styleUrls: ['./recommendation-configurator.component.scss']
})
export class RecommendationConfiguratorComponent implements OnInit {
  isDataLoading = true;
  qualityCategories = QualityCategory;
  recommendationSuitabilityOptions: RecommendationSuitability[] = [];

  get noDescriptionText(): string {
    return 'No description';
  }

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    public attributeOptionsService: AttributeOptionsService,
    public recommendationService: ApproachRecommendationService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    this.attributeOptionsService.requestAttributeOptions().then(() => {
      this.recommendationService.setRecommendationInformationSuitability(
        RecommendationSuitability.Neutral
      );

      this.isDataLoading = false;
    });

    this.recommendationSuitabilityOptions = Object.values(
      RecommendationSuitability
    ).filter((value: string) => isNaN(Number(value)));
  }

  getRadioButtonColor(
    recommendationSuitability: RecommendationSuitability
  ): ThemePalette {
    switch (recommendationSuitability) {
      case RecommendationSuitability.Include:
        return 'primary';
      case RecommendationSuitability.Exclude:
        return 'warn';
      default:
        return 'accent';
    }
  }

  onSearchRecommendation(): void {
    const approachRecommendationRequest: ApproachRecommendationRequest =
      this.recommendationService.createRecommendationRequest();

    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        body: approachRecommendationRequest
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations = value;
        this.recommendationService.selectedPreset = undefined;
        this.router.navigate(['phase/2/recommendation/result']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }
}
