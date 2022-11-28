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
import { RecommendationPreset } from '../../../api/repository/models/recommendation-preset';
import { QualitySublevelAttributeRecommendationInformation } from 'api/repository/models/quality-sublevel-attribute-recommendation-information';
import { ArchitecturalDesignRecommendation } from 'api/repository/models/architectural-design-recommendation';
import { ArchitecturalDesignRecommendationRequest } from 'api/repository/models';

@Injectable({
  providedIn: 'root'
})
export class ApproachRecommendationService {
  private _recommendationsSubject: BehaviorSubject<ApproachRecommendation[]> =
    new BehaviorSubject<ApproachRecommendation[]>([]);

  public get recommendations(): ApproachRecommendation[] {
    return this._recommendationsSubject.value;
  }

  public set recommendations(value: ApproachRecommendation[]) {
    this._recommendationsSubject.next(value);
  }

  private _designRecommendationsSubject: BehaviorSubject<ArchitecturalDesignRecommendation[]> =
    new BehaviorSubject<ArchitecturalDesignRecommendation[]>([]);

  public get designRecommendations(): ArchitecturalDesignRecommendation[] {
    return this._designRecommendationsSubject.value;
  }

  public set designRecommendations(value: ArchitecturalDesignRecommendation[]) {
    this._designRecommendationsSubject.next(value);
  }

  public selectedPreset: RecommendationPreset | undefined = undefined;

  public domainArtifactInformation: DomainArtifactInputAttributeRecommendationInformation[] =
    [];
  public runtimeArtifactInformation: RuntimeArtifactInputAttributeRecommendationInformation[] =
    [];
  public modelArtifactInformation: ModelArtifactInputAttributeRecommendationInformation[] =
    [];
  public executableInformation: ExecutableInputAttributeRecommendationInformation[] =
    [];
  public qualitySystemPropertyInformation: QualityAttributeRecommendationInformation[] =
    [];
  public qualityAttributeInformation: QualityAttributeRecommendationInformation[] =
    [];
  public qualitySublevelInformation: QualitySublevelAttributeRecommendationInformation[] =
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
    this.qualitySystemPropertyInformation = [];
    this.qualityAttributeInformation = [];
    this.qualitySublevelInformation = [];
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

  setQualitiesToNeutral() : void {
     this.qualityAttributeInformation.forEach(
       (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
     );
     this.qualitySublevelInformation.forEach(
       (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
     );
  }

  setAllNotQualitiyAttributesToNeutral() : void {
    this.domainArtifactInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.runtimeArtifactInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.modelArtifactInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.executableInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.qualitySystemPropertyInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.directionInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.automationLevelInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.analysisTypeInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.techniqueInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.architectureInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.serviceTypeInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.validationMethodInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.toolSupportInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.resultsQualityInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
    this.accuracyPrecisionInformation.forEach(
      (e) => (e.recommendationSuitability = RecommendationSuitability.Neutral)
    );
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
      this.qualitySystemPropertyInformation,
      this.attributeOptionsService.getQualitiesByCategory(
        QualityCategory.SystemProperty
      ),
      recommendationSuitability
    );
    this.setAttributeInformation(
      this.qualityAttributeInformation,
      this.attributeOptionsService.getQualitiesByCategory(
        QualityCategory.Attribute
      ),
      recommendationSuitability
    );

    this.setAttributeInformation(
      this.qualitySublevelInformation,
      this.attributeOptionsService.qualitySublevels.value,
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

      qualityInformation: this.qualityAttributeInformation.concat(
        this.qualitySystemPropertyInformation
      ),

      qualitySublevelInformation: this.qualitySublevelInformation,
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

  createDesignRecommendationRequest(): ArchitecturalDesignRecommendationRequest {
    return {
      qualityInformation: this.qualityAttributeInformation.concat(
        this.qualitySystemPropertyInformation
      ),
      qualitySublevelInformation: this.qualitySublevelInformation,
    };
  }

  getSuitabilityDisplayString(suitabilityScore: number) {
    if (suitabilityScore < 0) {
      return 'Not enough information';
    }
    return `${suitabilityScore}%`;
  }
}
