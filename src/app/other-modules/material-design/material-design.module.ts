import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatIconModule, MatListModule, MatCardModule, MatChipsModule,
  MatProgressBarModule, MatSnackBarModule, MatButtonModule, MatDialogModule, MatInputModule, MatTabsModule
} from "@angular/material"
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class DesignModule { }
