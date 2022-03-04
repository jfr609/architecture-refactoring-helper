import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { AttributeOptionsService } from '../../../services/attribute-options.service';
import { QualityCategory } from '../../../../../api/repository/models/quality-category';
import { Quality } from '../../../../../api/repository/models/quality';
import { ApproachRecommendationRequest } from '../../../../../api/repository/models/approach-recommendation-request';
import { RecommendationSuitability } from '../../../../../api/repository/models/recommendation-suitability';
import { ThemePalette } from '@angular/material/core';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { DomainArtifactInputAttributeRecommendationInformation } from '../../../../../api/repository/models/domain-artifact-input-attribute-recommendation-information';
import { RuntimeArtifactInputAttributeRecommendationInformation } from '../../../../../api/repository/models/runtime-artifact-input-attribute-recommendation-information';
import { ModelArtifactInputAttributeRecommendationInformation } from '../../../../../api/repository/models/model-artifact-input-attribute-recommendation-information';
import { ExecutableInputAttributeRecommendationInformation } from '../../../../../api/repository/models/executable-input-attribute-recommendation-information';
import { QualityAttributeRecommendationInformation } from '../../../../../api/repository/models/quality-attribute-recommendation-information';
import { ResultsQualityAttributeRecommendationInformation } from '../../../../../api/repository/models/results-quality-attribute-recommendation-information';
import { AccuracyPrecisionAttributeRecommendationInformation } from '../../../../../api/repository/models/accuracy-precision-attribute-recommendation-information';
import { ToolSupportAttributeRecommendationInformation } from '../../../../../api/repository/models/tool-support-attribute-recommendation-information';
import { ValidationMethodAttributeRecommendationInformation } from '../../../../../api/repository/models/validation-method-attribute-recommendation-information';
import { ServiceTypeAttributeRecommendationInformation } from '../../../../../api/repository/models/service-type-attribute-recommendation-information';
import { ArchitectureAttributeRecommendationInformation } from '../../../../../api/repository/models/architecture-attribute-recommendation-information';
import { TechniqueAttributeRecommendationInformation } from '../../../../../api/repository/models/technique-attribute-recommendation-information';
import { AnalysisTypeAttributeRecommendationInformation } from '../../../../../api/repository/models/analysis-type-attribute-recommendation-information';
import { AutomationLevelAttributeRecommendationInformation } from '../../../../../api/repository/models/automation-level-attribute-recommendation-information';
import { DirectionAttributeRecommendationInformation } from '../../../../../api/repository/models/direction-attribute-recommendation-information';
import { ApproachRecommendationsService } from '../../../services/approach-recommendations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approach-finder',
  templateUrl: './approach-finder.component.html',
  styleUrls: ['./approach-finder.component.scss']
})
export class ApproachFinderComponent implements OnInit {
  isDataLoading = true;
  qualityCategories = QualityCategory;
  recommendationSuitabilityOptions: RecommendationSuitability[] = [];

  domainArtifactInformation: DomainArtifactInputAttributeRecommendationInformation[] =
    [];
  runtimeArtifactInformation: RuntimeArtifactInputAttributeRecommendationInformation[] =
    [];
  modelArtifactInformation: ModelArtifactInputAttributeRecommendationInformation[] =
    [];
  executableInformation: ExecutableInputAttributeRecommendationInformation[] =
    [];

  qualityMetricInformation: QualityAttributeRecommendationInformation[] = [];
  qualityRequirementInformation: QualityAttributeRecommendationInformation[] =
    [];
  directionInformation: DirectionAttributeRecommendationInformation[] = [];
  automationLevelInformation: AutomationLevelAttributeRecommendationInformation[] =
    [];
  analysisTypeInformation: AnalysisTypeAttributeRecommendationInformation[] =
    [];
  techniqueInformation: TechniqueAttributeRecommendationInformation[] = [];

  architectureInformation: ArchitectureAttributeRecommendationInformation[] =
    [];
  serviceTypeInformation: ServiceTypeAttributeRecommendationInformation[] = [];

  validationMethodInformation: ValidationMethodAttributeRecommendationInformation[] =
    [];
  toolSupportInformation: ToolSupportAttributeRecommendationInformation[] = [];
  resultsQualityInformation: ResultsQualityAttributeRecommendationInformation[] =
    [];
  accuracyPrecisionInformation: AccuracyPrecisionAttributeRecommendationInformation[] =
    [];

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    public attributeOptionsService: AttributeOptionsService,
    private recommendationsService: ApproachRecommendationsService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    this.attributeOptionsService.requestAttributeOptions().then(() => {
      this.setRadioButtonDefaults();

      this.isDataLoading = false;
    });

    this.recommendationSuitabilityOptions = Object.values(
      RecommendationSuitability
    ).filter((value) => isNaN(Number(value)));
  }

  setRadioButtonDefaults(): void {
    for (const domainArtifact of this.attributeOptionsService.domainArtifacts
      .value) {
      this.domainArtifactInformation.push({
        attribute: domainArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const runtimeArtifact of this.attributeOptionsService.runtimeArtifacts
      .value) {
      this.runtimeArtifactInformation.push({
        attribute: runtimeArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const modelArtifact of this.attributeOptionsService.modelArtifacts
      .value) {
      this.modelArtifactInformation.push({
        attribute: modelArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const executable of this.attributeOptionsService.executables.value) {
      this.executableInformation.push({
        attribute: executable,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const quality of this.getQualitiesByCategory(QualityCategory.Metric)) {
      this.qualityMetricInformation.push({
        attribute: quality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const quality of this.getQualitiesByCategory(
      QualityCategory.Requirement
    )) {
      this.qualityRequirementInformation.push({
        attribute: quality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const direction of this.attributeOptionsService.directions.value) {
      this.directionInformation.push({
        attribute: direction,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const automationLevel of this.attributeOptionsService.automationLevels
      .value) {
      this.automationLevelInformation.push({
        attribute: automationLevel,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const analysisType of this.attributeOptionsService.analysisTypes
      .value) {
      this.analysisTypeInformation.push({
        attribute: analysisType,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const technique of this.attributeOptionsService.techniques.value) {
      this.techniqueInformation.push({
        attribute: technique,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const architecture of this.attributeOptionsService.architectures
      .value) {
      this.architectureInformation.push({
        attribute: architecture,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const serviceType of this.attributeOptionsService.serviceTypes.value) {
      this.serviceTypeInformation.push({
        attribute: serviceType,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const validationMethod of this.attributeOptionsService
      .validationMethods.value) {
      this.validationMethodInformation.push({
        attribute: validationMethod,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const toolSupport of this.attributeOptionsService.toolSupports.value) {
      this.toolSupportInformation.push({
        attribute: toolSupport,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const resultsQuality of this.attributeOptionsService.resultsQualities
      .value) {
      this.resultsQualityInformation.push({
        attribute: resultsQuality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const accuracyPrecision of this.attributeOptionsService
      .accuracyPrecisions.value) {
      this.accuracyPrecisionInformation.push({
        attribute: accuracyPrecision,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
  }

  getQualitiesByCategory(category: QualityCategory): Quality[] {
    return this.attributeOptionsService.qualities.value.filter(
      (value: Quality) => value.category === category
    );
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
    this.isDataLoading = true;
    const approachRecommendationRequest: ApproachRecommendationRequest = {
      domainArtifactInformation: this.domainArtifactInformation,
      runtimeArtifactInformation: this.runtimeArtifactInformation,
      modelArtifactInformation: this.modelArtifactInformation,
      executableInformation: this.executableInformation,

      qualityInformation: this.qualityRequirementInformation.concat(
        this.qualityMetricInformation
      ),
      directionInformation: this.directionInformation,
      automationLevelInformation: this.automationLevelInformation,
      analysisTypeInformation: this.analysisTypeInformation,
      techniqueInformation: this.techniqueInformation,

      architectureInformation: this.architectureInformation,
      serviceTypeInformation: this.serviceTypeInformation,

      validationMethodInformation: this.validationMethodInformation,
      toolSupportInformation: this.toolSupportInformation,
      resultsQualityInformation: this.resultsQualityInformation,
      accuracyPrecisionInformation: this.accuracyPrecisionInformation
    };

    this.refactoringApproachService
      .recommendRefactoringApproaches({
        body: approachRecommendationRequest
      })
      .subscribe({
        next: (value: ApproachRecommendation[]) => {
          this.recommendationsService.recommendations.next(value);
          this.router
            .navigate(['/recommendations'])
            .then(() => (this.isDataLoading = false));
        },
        error: (err) => {
          console.log(err);
          this.utilService.callSnackBar(
            'Error! Receiving recommended refactoring approaches failed.'
          );
        }
      });
  }
}
