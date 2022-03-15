import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/views/home-page/home-page.component';
import { ApproachFormComponent } from './components/views/approach-form/approach-form.component';
import { ApproachExplorerComponent } from './components/views/approach-explorer/approach-explorer.component';
import { RecommendationConfiguratorComponent } from './components/views/recommendation-configurator/recommendation-configurator.component';
import { NAV_PARAM_APPROACH_ID } from './app.constants';
import { ApproachViewComponent } from './components/views/approach-view/approach-view.component';
import { RecommendationResultComponent } from './components/views/recommendation-result/recommendation-result.component';
import { RecommendationComponent } from './components/views/recommendation/recommendation.component';
import { ApplicationSettingsDialogComponent } from './components/dialogs/application-settings-dialog/application-settings-dialog.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'approach',
    component: ApproachFormComponent
  },
  {
    path: `approach/:${NAV_PARAM_APPROACH_ID}`,
    component: ApproachViewComponent
  },
  {
    path: `approach/:${NAV_PARAM_APPROACH_ID}/edit`,
    component: ApproachFormComponent
  },
  {
    path: 'approaches',
    component: ApproachExplorerComponent
  },
  {
    path: 'recommendation',
    component: RecommendationComponent
  },
  {
    path: 'recommendation/configure',
    component: RecommendationConfiguratorComponent
  },
  {
    path: 'recommendation/result',
    component: RecommendationResultComponent
  },
  {
    path: 'settings',
    component: ApplicationSettingsDialogComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
