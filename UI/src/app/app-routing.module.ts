import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from "./components/views/page-not-found/page-not-found.component";
import {HomePageComponent} from "./components/views/home-page/home-page.component";
import {ApproachAdderComponent} from "./components/views/approach-adder/approach-adder.component";
import {ApproachExplorerComponent} from "./components/views/approach-explorer/approach-explorer.component";
import {ApproachFinderComponent} from "./components/views/approach-finder/approach-finder.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'new-approach',
    component: ApproachAdderComponent
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
export class AppRoutingModule {
}
