import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApproachRecommendation } from '../../../api/repository/models/approach-recommendation';
import { DomainArtifactInputAttributeRecommendationInformation } from '../../../api/repository/models/domain-artifact-input-attribute-recommendation-information';
import { RuntimeArtifactInputAttributeRecommendationInformation } from '../../../api/repository/models/runtime-artifact-input-attribute-recommendation-information';
import { ModelArtifactInputAttributeRecommendationInformation } from '../../../api/repository/models/model-artifact-input-attribute-recommendation-information';
import { ExecutableInputAttributeRecommendationInformation } from '../../../api/repository/models/executable-input-attribute-recommendation-information';
import { QualityAttributeRecommendationInformation } from '../../../api/repository/models/quality-attribute-recommendation-information';
import { DirectionAttributeRecommendationInformation } from '../../../api/repository/models/direction-attribute-recommendation-information';
import { AutomationLevelAttributeRecommendationInformation } from '../../../api/repository/models/automation-level-attribute-recommendation-information';
import { AnalysisTypeAttributeRecommendationInformation } from '../../../api/repository/models/analysis-type-attribute-recommendation-information';
import { TechniqueAttributeRecommendationInformation } from '../../../api/repository/models/technique-attribute-recommendation-information';
import { ArchitectureAttributeRecommendationInformation } from '../../../api/repository/models/architecture-attribute-recommendation-information';
import { ServiceTypeAttributeRecommendationInformation } from '../../../api/repository/models/service-type-attribute-recommendation-information';
import { ValidationMethodAttributeRecommendationInformation } from '../../../api/repository/models/validation-method-attribute-recommendation-information';
import { ToolSupportAttributeRecommendationInformation } from '../../../api/repository/models/tool-support-attribute-recommendation-information';
import { ResultsQualityAttributeRecommendationInformation } from '../../../api/repository/models/results-quality-attribute-recommendation-information';
import { AccuracyPrecisionAttributeRecommendationInformation } from '../../../api/repository/models/accuracy-precision-attribute-recommendation-information';
import { RecommendationSuitability } from '../../../api/repository/models/recommendation-suitability';
import { QualityCategory } from '../../../api/repository/models/quality-category';
import { AttributeOptionsService } from './attribute-options.service';
import { ApproachRecommendationRequest } from '../../../api/repository/models/approach-recommendation-request';

@Injectable({
  providedIn: 'root'
})
export class ApproachRecommendationService {
  public recommendations: BehaviorSubject<ApproachRecommendation[]> =
    new BehaviorSubject<ApproachRecommendation[]>([]);

  public domainArtifactInformation: DomainArtifactInputAttributeRecommendationInformation[] =
    [];
  public runtimeArtifactInformation: RuntimeArtifactInputAttributeRecommendationInformation[] =
    [];
  public modelArtifactInformation: ModelArtifactInputAttributeRecommendationInformation[] =
    [];
  public executableInformation: ExecutableInputAttributeRecommendationInformation[] =
    [];
  public qualityMetricInformation: QualityAttributeRecommendationInformation[] =
    [];
  public qualityRequirementInformation: QualityAttributeRecommendationInformation[] =
    [];
  public directionInformation: DirectionAttributeRecommendationInformation[] =
    [];
  public automationLevelInformation: AutomationLevelAttributeRecommendationInformation[] =
    [];
  public analysisTypeInformation: AnalysisTypeAttributeRecommendationInformation[] =
    [];
  public techniqueInformation: TechniqueAttributeRecommendationInformation[] =
    [];
  public architectureInformation: ArchitectureAttributeRecommendationInformation[] =
    [];
  public serviceTypeInformation: ServiceTypeAttributeRecommendationInformation[] =
    [];
  public validationMethodInformation: ValidationMethodAttributeRecommendationInformation[] =
    [];
  public toolSupportInformation: ToolSupportAttributeRecommendationInformation[] =
    [];
  public resultsQualityInformation: ResultsQualityAttributeRecommendationInformation[] =
    [];
  public accuracyPrecisionInformation: AccuracyPrecisionAttributeRecommendationInformation[] =
    [];

  constructor(private attributeOptionsService: AttributeOptionsService) {}

  clearRecommendationInformation(): void {
    this.domainArtifactInformation = [];
    this.runtimeArtifactInformation = [];
    this.modelArtifactInformation = [];
    this.executableInformation = [];
    this.qualityMetricInformation = [];
    this.qualityRequirementInformation = [];
    this.directionInformation = [];
    this.automationLevelInformation = [];
    this.analysisTypeInformation = [];
    this.techniqueInformation = [];
    this.architectureInformation = [];
    this.serviceTypeInformation = [];
    this.validationMethodInformation = [];
    this.toolSupportInformation = [];
    this.resultsQualityInformation = [];
    this.accuracyPrecisionInformation = [];
  }

  setAttributeInformation<T>(
    informationArray: {
      attribute: T;
      recommendationSuitability: RecommendationSuitability;
    }[],
    options: T[],
    recommendationSuitability: RecommendationSuitability
  ): void {
    for (const option of options) {
      informationArray.push({
        attribute: option,
        recommendationSuitability: recommendationSuitability
      });
    }
  }

  setRecommendationInformationSuitability(
    recommendationSuitability: RecommendationSuitability
  ): void {
    this.clearRecommendationInformation();

    this.setAttributeInformation(
      this.domainArtifactInformation,
      this.attributeOptionsService.domainArtifacts.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.runtimeArtifactInformation,
      this.attributeOptionsService.runtimeArtifacts.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.modelArtifactInformation,
      this.attributeOptionsService.modelArtifacts.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.executableInformation,
      this.attributeOptionsService.executables.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.qualityMetricInformation,
      this.attributeOptionsService.getQualitiesByCategory(
        QualityCategory.Metric
      ),
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.qualityRequirementInformation,
      this.attributeOptionsService.getQualitiesByCategory(
        QualityCategory.Requirement
      ),
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.directionInformation,
      this.attributeOptionsService.directions.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.automationLevelInformation,
      this.attributeOptionsService.automationLevels.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.analysisTypeInformation,
      this.attributeOptionsService.analysisTypes.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.techniqueInformation,
      this.attributeOptionsService.techniques.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.architectureInformation,
      this.attributeOptionsService.architectures.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.serviceTypeInformation,
      this.attributeOptionsService.serviceTypes.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.validationMethodInformation,
      this.attributeOptionsService.validationMethods.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.toolSupportInformation,
      this.attributeOptionsService.toolSupports.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.resultsQualityInformation,
      this.attributeOptionsService.resultsQualities.value,
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.accuracyPrecisionInformation,
      this.attributeOptionsService.accuracyPrecisions.value,
      recommendationSuitability
    );
  }

  createRecommendationRequest(): ApproachRecommendationRequest {
    return {
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
  }
}
