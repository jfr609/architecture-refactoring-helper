import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UtilService } from '../../../services/util.service';
import { AttributeOptionsService } from '../../../services/attribute-options.service';

@Component({
  selector: 'app-approach-finder',
  templateUrl: './approach-finder.component.html',
  styleUrls: ['./approach-finder.component.scss']
})
export class ApproachFinderComponent implements OnInit {
  isDataLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private attributeOptionsService: AttributeOptionsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    this.attributeOptionsService
      .requestAttributeOptions(this.utilService)
      .then(() => {
        this.isDataLoading = false;
      });
  }
}
