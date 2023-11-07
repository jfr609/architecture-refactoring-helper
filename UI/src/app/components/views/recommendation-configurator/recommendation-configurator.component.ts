import { Component, OnInit, ViewChild } from '@angular/core';
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
import { lastValueFrom, Subscription } from 'rxjs';
import { MODES, TOOLTIP_HIDE_DELAY, TOOLTIP_SHOW_DELAY } from '../../../app.constants';
import { ActivatedRoute } from '@angular/router';
import { ScenarioService } from 'api/repository/services';
import { ProjectService } from 'src/app/services/project.service';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-recommendation-configurator',
  templateUrl: './recommendation-configurator.component.html',
  styleUrls: ['./recommendation-configurator.component.scss']
})
export class RecommendationConfiguratorComponent implements OnInit {
  readonly TOOLTIP_SHOW_DELAY = TOOLTIP_SHOW_DELAY;
  readonly TOOLTIP_HIDE_DELAY = TOOLTIP_HIDE_DELAY;
  readonly QualityCategories = QualityCategory;

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  scenarioBased: boolean = false;
  configurationEnabled: boolean = true;

  isDataLoading = true;
  recommendationSuitabilityOptions: RecommendationSuitability[] = [];

  sub!: Subscription;

  get noDescriptionText(): string {
    return 'No description';
  }

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    public attributeOptionsService: AttributeOptionsService,
    public recommendationService: ApproachRecommendationService,
    public utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;

    Promise.all([
      this.attributeOptionsService.requestAttributeOptions(),
      (this.sub = this.route.params.subscribe((params) => {
        if(params['mode'] == MODES.modeScenario){
          this.scenarioBased = true;
          this.configurationEnabled = !this.scenarioBased;
        }
      })),
      this.projectService.requestProjectAttributes()
    ]).then(() => {
      this.recommendationService.setRecommendationInformationSuitability(
        RecommendationSuitability.Neutral
      );
      if (this.scenarioBased) {
        this.projectService.setQualitiesFromScenarios();
      }

      this.isDataLoading = false;
    });

    this.recommendationSuitabilityOptions = Object.values(
      RecommendationSuitability
    ).filter((value: string) => isNaN(Number(value)));

    this.utilService.setSideNavScenarioBased(this.scenarioBased);
    this.utilService.openSideNav();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.utilService.closeSideNav();
        if (this.scenarioBased) {
          this.recommendationService.setQualitiesToNeutral();
        }
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

  getIconName(recommendationSuitability: RecommendationSuitability): string {
    switch (recommendationSuitability) {
      case RecommendationSuitability.Include:
        return 'done'; // Use 'done' for tick icon
      case RecommendationSuitability.Exclude:
        return 'cancel'; // Use 'cancel' for cross icon
      default:
        return ''; // Use 'fiber_manual_record' for filled circle
    }
  }

  getIconClass(recommendationSuitability: RecommendationSuitability): string {
    // Implement your logic to determine the color based on suitability
    // For example, return 'include-icon', 'neutral-icon', or 'exclude-icon'
    switch (recommendationSuitability) {
      case RecommendationSuitability.Include:
        return 'include-icon';
      case RecommendationSuitability.Exclude:
        return 'exclude-icon';
      default:
        return 'neutral-icon';
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
        if (this.scenarioBased) {
          this.router.navigate([
            'phase/2/recommendation/result',
            'scenarioBased'
          ]);
        } else {
          this.router.navigate(['phase/2/recommendation/result', 'manual']);
        }
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }

  resetConfiguration(): void {
    this.recommendationService.setAllNotQualitiyAttributesToNeutral();
    if(!this.scenarioBased){
      this.recommendationService.setQualitiesToNeutral();
    }
  }

  getTitle(): string {
    if(this.scenarioBased){
      return "Scenario-based filter for available refactoring approaches"
    }
    return "Configure a filter for available refactoring approaches";
  }
}
