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
  recommendations: BehaviorSubject<ApproachRecommendation[]> =
    new BehaviorSubject<ApproachRecommendation[]>([]);

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

  setRecommendationInformationSuitability(
    recommendationSuitability: RecommendationSuitability
  ): void {
    this.clearRecommendationInformation();

    for (const domainArtifact of this.attributeOptionsService.domainArtifacts
      .value) {
      this.domainArtifactInformation.push({
        attribute: domainArtifact,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const runtimeArtifact of this.attributeOptionsService.runtimeArtifacts
      .value) {
      this.runtimeArtifactInformation.push({
        attribute: runtimeArtifact,
        recommendationSuitability: recommendationSuitability
      });
    }
    for (const modelArtifact of this.attributeOptionsService.modelArtifacts
      .value) {
      this.modelArtifactInformation.push({
        attribute: modelArtifact,
        recommendationSuitability: recommendationSuitability
      });
    }
    for (const executable of this.attributeOptionsService.executables.value) {
      this.executableInformation.push({
        attribute: executable,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const quality of this.attributeOptionsService.getQualitiesByCategory(
      QualityCategory.Metric
    )) {
      this.qualityMetricInformation.push({
        attribute: quality,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const quality of this.attributeOptionsService.getQualitiesByCategory(
      QualityCategory.Requirement
    )) {
      this.qualityRequirementInformation.push({
        attribute: quality,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const direction of this.attributeOptionsService.directions.value) {
      this.directionInformation.push({
        attribute: direction,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const automationLevel of this.attributeOptionsService.automationLevels
      .value) {
      this.automationLevelInformation.push({
        attribute: automationLevel,
        recommendationSuitability: recommendationSuitability
      });
    }
    for (const analysisType of this.attributeOptionsService.analysisTypes
      .value) {
      this.analysisTypeInformation.push({
        attribute: analysisType,
        recommendationSuitability: recommendationSuitability
      });
    }
    for (const technique of this.attributeOptionsService.techniques.value) {
      this.techniqueInformation.push({
        attribute: technique,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const architecture of this.attributeOptionsService.architectures
      .value) {
      this.architectureInformation.push({
        attribute: architecture,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const serviceType of this.attributeOptionsService.serviceTypes.value) {
      this.serviceTypeInformation.push({
        attribute: serviceType,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const validationMethod of this.attributeOptionsService
      .validationMethods.value) {
      this.validationMethodInformation.push({
        attribute: validationMethod,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const toolSupport of this.attributeOptionsService.toolSupports.value) {
      this.toolSupportInformation.push({
        attribute: toolSupport,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const resultsQuality of this.attributeOptionsService.resultsQualities
      .value) {
      this.resultsQualityInformation.push({
        attribute: resultsQuality,
        recommendationSuitability: recommendationSuitability
      });
    }

    for (const accuracyPrecision of this.attributeOptionsService
      .accuracyPrecisions.value) {
      this.accuracyPrecisionInformation.push({
        attribute: accuracyPrecision,
        recommendationSuitability: recommendationSuitability
      });
    }
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
