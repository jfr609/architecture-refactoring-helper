import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageComponent} from './components/views/home-page/home-page.component';
import {PageNotFoundComponent} from './components/views/page-not-found/page-not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { ArchitectureRefactoringHelperComponent } from './components/views/architecture-refactoring-helper/architecture-refactoring-helper.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ApproachViewComponent } from './components/views/approach-view/approach-view.component';
import { ApproachFinderComponent } from './components/views/approach-finder/approach-finder.component';
import { ApproachExplorerComponent } from './components/views/approach-explorer/approach-explorer.component';
import {ApiModule} from "../../api/repository/api.module";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    ArchitectureRefactoringHelperComponent,
    ApproachViewComponent,
    ApproachFinderComponent,
    ApproachExplorerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: environment.API_URL}),
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
