import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ApproachFinderComponent } from './components/views/approach-finder/approach-finder.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    ArchitectureRefactoringHelperComponent,
    ApproachFormComponent,
    ApproachFinderComponent,
    ApproachExplorerComponent,
    ConfirmDialogComponent,
    ConnectedDataListsComponent,
    ApproachViewComponent,
    CreateAttributeDialogComponent,
    DeleteAttributeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.API_URL }),
    FlexLayoutModule,
    MatToolbarModule,
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
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
