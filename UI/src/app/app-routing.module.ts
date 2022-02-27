import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/views/home-page/home-page.component';
import { ApproachViewComponent } from './components/views/approach-view/approach-view.component';
import { ApproachExplorerComponent } from './components/views/approach-explorer/approach-explorer.component';
import { ApproachFinderComponent } from './components/views/approach-finder/approach-finder.component';
import { NAV_PARAM_APPROACH_ID } from './app.constants';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'approach',
    component: ApproachViewComponent
  },
  {
    path: `approach/:${NAV_PARAM_APPROACH_ID}`,
    component: ApproachViewComponent
  },
  {
    path: 'approaches',
    component: ApproachExplorerComponent
  },
  {
    path: 'helper',
    component: ApproachFinderComponent
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
