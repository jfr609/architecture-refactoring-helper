import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/views/home-page/home-page.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ArchitectureRefactoringHelperComponent } from './components/views/architecture-refactoring-helper/architecture-refactoring-helper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApproachFormComponent } from './components/views/approach-form/approach-form.component';
import { RecommendationConfiguratorComponent } from './components/views/recommendation-configurator/recommendation-configurator.component';
import { ApproachExplorerComponent } from './components/views/approach-explorer/approach-explorer.component';
import { ApiModule } from '../../api/repository/api.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { ConnectedDataListsComponent } from './components/generics/connected-data-lists/connected-data-lists.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApproachViewComponent } from './components/views/approach-view/approach-view.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateAttributeDialogComponent } from './components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { DeleteAttributeDialogComponent } from './components/dialogs/delete-attribute-dialog/delete-attribute-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecommendationResultComponent } from './components/views/recommendation-result/recommendation-result.component';
import { RecommendationComponent } from './components/views/recommendation/recommendation.component';
import { CardButtonComponent } from './components/generics/card-button/card-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApplicationSettingsDialogComponent } from './components/dialogs/application-settings-dialog/application-settings-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FrameworkPhaseOneComponent } from './components/views/framework-phase-one/framework-phase-one.component';
import { FrameworkPhaseTwoComponent } from './components/views/framework-phase-two/framework-phase-two.component';
import { FrameworkPhaseThreeComponent } from './components/views/framework-phase-three/framework-phase-three.component';
import { ImageCarouselComponent } from './components/generics/image-carousel/image-carousel.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectDescriptionComponent } from './components/views/phase-one-views/project-description/project-description.component';
import { StrategicGoalsComponent } from './components/views/phase-one-views/strategic-goals/strategic-goals.component';
import { QualityAttributesComponent } from './components/views/phase-one-views/quality-attributes/quality-attributes.component';
import { AssessmentComponent } from './components/views/phase-one-views/assessment/assessment.component';
import { SummaryComponent } from './components/views/phase-one-views/summary/summary.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { ArchitecturalDesignExplorerComponent } from './components/views/architectural-design-explorer/architectural-design-explorer.component';
import { ArchitecturalDesignViewComponent } from './components/views/architectural-design-view/architectural-design-view.component';
import { ArchitecturalRecommendationResultComponent } from './components/views/architectural-recommendation-result/architectural-recommendation-result.component';
import { MatBadgeModule } from '@angular/material/badge';


import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    ArchitectureRefactoringHelperComponent,
    ApproachFormComponent,
    RecommendationConfiguratorComponent,
    ApproachExplorerComponent,
    ConfirmDialogComponent,
    ConnectedDataListsComponent,
    ApproachViewComponent,
    CreateAttributeDialogComponent,
    DeleteAttributeDialogComponent,
    RecommendationResultComponent,
    RecommendationComponent,
    CardButtonComponent,
    ApplicationSettingsDialogComponent,
    FrameworkPhaseOneComponent,
    FrameworkPhaseTwoComponent,
    FrameworkPhaseThreeComponent,
    ImageCarouselComponent,
    ProjectDescriptionComponent,
    StrategicGoalsComponent,
    QualityAttributesComponent,
    AssessmentComponent,
    SummaryComponent,
    ArchitecturalDesignExplorerComponent,
    ArchitecturalDesignViewComponent,
    ArchitecturalRecommendationResultComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.API_URL }),
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    DragDropModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatChipsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  providers: [StrategicGoalsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
