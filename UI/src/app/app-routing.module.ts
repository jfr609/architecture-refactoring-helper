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
import { FrameworkPhaseOneComponent } from './components/views/framework-phase-one/framework-phase-one.component';
import { FrameworkPhaseTwoComponent } from './components/views/framework-phase-two/framework-phase-two.component';
import { FrameworkPhaseThreeComponent } from './components/views/framework-phase-three/framework-phase-three.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'stage/1',
    component: FrameworkPhaseOneComponent
  },
  {
    path: 'stage/2',
    component: FrameworkPhaseTwoComponent
  },
  {
    path: 'stage/3',
    component: FrameworkPhaseThreeComponent
  },
  {
    path: 'stage/2/approach',
    component: ApproachFormComponent
  },
  {
    path: `stage/2/approach/:${NAV_PARAM_APPROACH_ID}`,
    component: ApproachViewComponent
  },
  {
    path: `stage/2/approach/:${NAV_PARAM_APPROACH_ID}/edit`,
    component: ApproachFormComponent
  },
  {
    path: 'stage/2/approaches',
    component: ApproachExplorerComponent
  },
  {
    path: 'stage/2/recommendation',
    component: RecommendationComponent
  },
  {
    path: 'stage/2/recommendation/configure',
    component: RecommendationConfiguratorComponent
  },
  {
    path: 'stage/2/recommendation/result',
    component: RecommendationResultComponent
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
