import { Injectable } from '@angular/core';
import { RecommendationSuitability, Scenario } from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ApproachRecommendationService } from './approach-recommendation.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public scenarios: BehaviorSubject<Scenario[]> = new BehaviorSubject<
    Scenario[]
  >([]);

  constructor(
    private scenarioService: ScenarioService,
    private utilService: UtilService,
    private recommendationService: ApproachRecommendationService
  ) {}

  requestProjectAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestScenarios());

    return Promise.all(dataLoadingPromises);
  }

  async requestScenarios(): Promise<void> {
    try {
      this.scenarios.next(
        await lastValueFrom(this.scenarioService.listScenario())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Scenarios inputs could not be retrieved.'
      );
    }
  }

  setQualitiesFromScenarios(): void {
    this.recommendationService.setQualitiesToNeutral();
    this.scenarios.value.forEach((s) => {
      s.qualities?.forEach((q) => {
        const quality =
          this.recommendationService.qualityAttributeInformation.find(
            (qai) => qai.attribute.name == q.name
          );
        if (quality) {
          quality.recommendationSuitability = RecommendationSuitability.Include;
        }
      });
    });

    this.scenarios.value.forEach((s) => {
      s.qualitySublevels?.forEach((q) => {
        const qualitySub =
          this.recommendationService.qualitySublevelInformation.find(
            (qai) => qai.attribute.name == q.name
          );
        if (qualitySub) {
          qualitySub.recommendationSuitability =
            RecommendationSuitability.Include;
        }
      });
    });
  }
}
