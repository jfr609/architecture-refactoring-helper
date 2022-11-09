import { Injectable } from '@angular/core';
import { Scenario } from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public scenarios: BehaviorSubject<Scenario[]> =
    new BehaviorSubject<Scenario[]>([]);
  

  constructor(
    private scenarioService: ScenarioService,
    private utilService: UtilService
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
}
