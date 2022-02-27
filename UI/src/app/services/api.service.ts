import { Injectable } from '@angular/core';
import { RefactoringApproach } from '../../../api/repository/models/refactoring-approach';
import { RefactoringApproachService } from '../../../api/repository/services/refactoring-approach.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private refactoringApproachService: RefactoringApproachService) {}

  requestRefactoringApproach(approachId: number): Promise<RefactoringApproach> {
    return lastValueFrom(
      this.refactoringApproachService.getRefactoringApproach({ id: approachId })
    );
  }
}
