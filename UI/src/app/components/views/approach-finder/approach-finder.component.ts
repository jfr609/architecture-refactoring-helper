import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { AttributeOptionsService } from '../../../services/attribute-options.service';
import { QualityCategory } from '../../../../../api/repository/models/quality-category';
import { Quality } from '../../../../../api/repository/models/quality';
import { ApproachRecommendationRequest } from '../../../../../api/repository/models/approach-recommendation-request';
import { RecommendationSuitability } from '../../../../../api/repository/models/recommendation-suitability';
import { DomainArtifactInformation } from '../../../../../api/repository/models/domain-artifact-information';
import { RuntimeArtifactInformation } from '../../../../../api/repository/models/runtime-artifact-information';
import { ModelArtifactInformation } from '../../../../../api/repository/models/model-artifact-information';
import { ExecutableInformation } from '../../../../../api/repository/models/executable-information';
import { QualityInformation } from '../../../../../api/repository/models/quality-information';
import { DirectionInformation } from '../../../../../api/repository/models/direction-information';
import { AnalysisTypeInformation } from '../../../../../api/repository/models/analysis-type-information';
import { AutomationLevelInformation } from '../../../../../api/repository/models/automation-level-information';
import { TechniqueInformation } from '../../../../../api/repository/models/technique-information';
import { ArchitectureInformation } from '../../../../../api/repository/models/architecture-information';
import { ServiceTypeInformation } from '../../../../../api/repository/models/service-type-information';
import { ValidationMethodInformation } from '../../../../../api/repository/models/validation-method-information';
import { ToolSupportInformation } from '../../../../../api/repository/models/tool-support-information';
import { ResultsQualityInformation } from '../../../../../api/repository/models/results-quality-information';
import { AccuracyPrecisionInformation } from '../../../../../api/repository/models/accuracy-precision-information';
import { ThemePalette } from '@angular/material/core';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';

@Component({
  selector: 'app-approach-finder',
  templateUrl: './approach-finder.component.html',
  styleUrls: ['./approach-finder.component.scss']
})
export class ApproachFinderComponent implements OnInit {
  isDataLoading: boolean = true;
  qualityCategories = QualityCategory;
  recommendationSuitabilityOptions: RecommendationSuitability[] = [];

  domainArtifactInformation: DomainArtifactInformation[] = [];
  runtimeArtifactInformation: RuntimeArtifactInformation[] = [];
  modelArtifactInformation: ModelArtifactInformation[] = [];
  executableInformation: ExecutableInformation[] = [];

  qualityMetricInformation: QualityInformation[] = [];
  qualityRequirementInformation: QualityInformation[] = [];
  directionInformation: DirectionInformation[] = [];
  automationLevelInformation: AutomationLevelInformation[] = [];
  analysisTypeInformation: AnalysisTypeInformation[] = [];
  techniqueInformation: TechniqueInformation[] = [];

  architectureInformation: ArchitectureInformation[] = [];
  serviceTypeInformation: ServiceTypeInformation[] = [];

  validationMethodInformation: ValidationMethodInformation[] = [];
  toolSupportInformation: ToolSupportInformation[] = [];
  resultsQualityInformation: ResultsQualityInformation[] = [];
  accuracyPrecisionInformation: AccuracyPrecisionInformation[] = [];

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    public attributeOptionsService: AttributeOptionsService,
    private utilService: UtilService
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
    for (const domainArtifact of this.attributeOptionsService.domainArtifacts) {
      this.domainArtifactInformation.push({
        domainArtifactInput: domainArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const runtimeArtifact of this.attributeOptionsService
      .runtimeArtifacts) {
      this.runtimeArtifactInformation.push({
        runtimeArtifactInput: runtimeArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const modelArtifact of this.attributeOptionsService.modelArtifacts) {
      this.modelArtifactInformation.push({
        modelArtifactInput: modelArtifact,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const executable of this.attributeOptionsService.executables) {
      this.executableInformation.push({
        executableInput: executable,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const quality of this.getQualitiesByCategory(QualityCategory.Metric)) {
      this.qualityMetricInformation.push({
        quality: quality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const quality of this.getQualitiesByCategory(
      QualityCategory.Requirement
    )) {
      this.qualityRequirementInformation.push({
        quality: quality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const direction of this.attributeOptionsService.directions) {
      this.directionInformation.push({
        direction: direction,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const automationLevel of this.attributeOptionsService
      .automationLevels) {
      this.automationLevelInformation.push({
        automationLevel: automationLevel,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const analysisType of this.attributeOptionsService.analysisTypes) {
      this.analysisTypeInformation.push({
        analysisType: analysisType,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
    for (const technique of this.attributeOptionsService.techniques) {
      this.techniqueInformation.push({
        technique: technique,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const architecture of this.attributeOptionsService.architectures) {
      this.architectureInformation.push({
        architecture: architecture,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const serviceType of this.attributeOptionsService.serviceTypes) {
      this.serviceTypeInformation.push({
        serviceType: serviceType,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const validationMethod of this.attributeOptionsService
      .validationMethods) {
      this.validationMethodInformation.push({
        validationMethod: validationMethod,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const toolSupport of this.attributeOptionsService.toolSupports) {
      this.toolSupportInformation.push({
        toolSupport: toolSupport,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const resultsQuality of this.attributeOptionsService
      .resultsQualities) {
      this.resultsQualityInformation.push({
        resultsQuality: resultsQuality,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }

    for (const accuracyPrecision of this.attributeOptionsService
      .accuracyPrecisions) {
      this.accuracyPrecisionInformation.push({
        accuracyPrecision: accuracyPrecision,
        recommendationSuitability: RecommendationSuitability.Neutral
      });
    }
  }

  getQualitiesByCategory(category: QualityCategory): Quality[] {
    return this.attributeOptionsService.qualities.filter(
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
    let approachRecommendationRequest: ApproachRecommendationRequest = {
      inputRecommendationInformation: {
        domainArtifactInformation: this.domainArtifactInformation,
        runtimeArtifactInformation: this.runtimeArtifactInformation,
        modelArtifactInformation: this.modelArtifactInformation,
        executableInformation: this.executableInformation
      },
      processRecommendationInformation: {
        qualityInformation: this.qualityRequirementInformation.concat(
          this.qualityMetricInformation
        ),
        directionInformation: this.directionInformation,
        automationLevelInformation: this.automationLevelInformation,
        analysisTypeInformation: this.analysisTypeInformation,
        techniqueInformation: this.techniqueInformation
      },
      outputRecommendationInformation: {
        architectureInformation: this.architectureInformation,
        serviceTypeInformation: this.serviceTypeInformation
      },
      usabilityRecommendationInformation: {
        validationMethodInformation: this.validationMethodInformation,
        toolSupportInformation: this.toolSupportInformation,
        resultsQualityInformation: this.resultsQualityInformation,
        accuracyPrecisionInformation: this.accuracyPrecisionInformation
      }
    };

    console.log('Recommendation request: ', approachRecommendationRequest);
    this.refactoringApproachService
      .generateRefactoringApproachRecommendation({
        body: approachRecommendationRequest
      })
      .subscribe({
        next: (value: ApproachRecommendation[]) => {
          console.log('Recommendations: ', value);
        },
        error: (err) => {
          console.log(err);
          this.utilService.callSnackBar(
            'Error! Receiving refactoring approach recommendations failed.'
          );
        }
      });
  }
}
