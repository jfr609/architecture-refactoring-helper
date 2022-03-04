import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApproachRecommendation } from '../../../api/repository/models/approach-recommendation';

@Injectable({
  providedIn: 'root'
})
export class ApproachRecommendationsService {
  recommendations: BehaviorSubject<ApproachRecommendation[]> =
    new BehaviorSubject<ApproachRecommendation[]>([]);

  constructor() {}
}
