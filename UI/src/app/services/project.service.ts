import { Injectable } from '@angular/core';
import { ProjectDescription, RecommendationSuitability, Scenario, StrategicGoals } from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import { ProjectDescriptionService } from 'api/repository/services/project-description.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ApproachRecommendationService } from './approach-recommendation.service';
import { UtilService } from './util.service';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { Objectives } from 'api/repository/models/objectives';
import { ObjectivesService } from 'api/repository/services/objectives-service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public scenarios: BehaviorSubject<Scenario[]> = new BehaviorSubject<
    Scenario[]
  >([]);
  public projectDescriptions: BehaviorSubject<ProjectDescription[]> = new BehaviorSubject<
    ProjectDescription[]
  >([]);
  public strategicGoals: BehaviorSubject<StrategicGoals[]> = new BehaviorSubject<
    StrategicGoals[]
  >([]);
  public objectives: BehaviorSubject<Objectives[]> = new BehaviorSubject<Objectives[]>([]);

  constructor(
    private scenarioService: ScenarioService,
    private utilService: UtilService,
    private recommendationService: ApproachRecommendationService,
    private projectDescriptionService: ProjectDescriptionService,
    private strategicGoalsService: StrategicGoalsService,
    private objectivesService: ObjectivesService,
  ) { }

  requestProjectAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestScenarios());

    return Promise.all(dataLoadingPromises);
  }

  requestStrategicGoalsAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestStrategicGoals());

    return Promise.all(dataLoadingPromises);
  }


  async requestStrategicGoals(): Promise<void> {
    try {
      this.strategicGoals.next(
        await lastValueFrom(this.strategicGoalsService.listStrategicGoals())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Strategic Goals inputs could not be retrieved.'
      );
    }
  }
  requestObjectivesAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestObjectives());

    return Promise.all(dataLoadingPromises);
  }
  async requestScenarios(): Promise<void> {//user for assessement
    try {
      this.scenarios.next(
        await lastValueFrom(this.scenarioService.listScenario())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Objectives could not be retrieved.'
      );
    }
  }
  async requestObjectives(): Promise<void> {//user for assessement
    try {
      this.objectives.next(
        await lastValueFrom(this.objectivesService.listObjectives())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Objectives inputs could not be retrieved.'
      );
    }
  }

  requestProjectDescriptionAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestProjectDescription());

    return Promise.all(dataLoadingPromises);
  }
  async requestProjectDescription(): Promise<void> {
    try {
      this.projectDescriptions.next(
        await lastValueFrom(this.projectDescriptionService.listProjectDescription())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Project Descriptions inputs could not be retrieved.'
      );
    }
  }

  requestProjectAssessmentAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestProjectDescription());

    return Promise.all(dataLoadingPromises);
  }

  async requestProjectAssessment(): Promise<void> {
    try {
      this.projectDescriptions.next(
        await lastValueFrom(this.projectDescriptionService.listProjectDescription())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Project Assessment inputs could not be retrieved.'
      );
    }
  }

  requestProjectGoalsAttributes(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestProjectGoals());

    return Promise.all(dataLoadingPromises);

  }

  async requestProjectGoals(): Promise<void> {
    try {
      this.strategicGoals.next(
        await lastValueFrom(this.strategicGoalsService.listStrategicGoals())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Project Goals inputs could not be retrieved.'
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

  getQualitiesOfScenarioLengths(): number {
    let count = 0;
    this.scenarios.value.forEach((s) => {
      if (s.qualities) {
        count += s.qualities?.length;
      }
      if (s.qualitySublevels) {
        count += s.qualitySublevels?.length;
      }
    });
    return count;
  }
}
