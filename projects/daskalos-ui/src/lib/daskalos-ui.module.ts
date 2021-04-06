import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DaskalosCoreModule } from 'daskalos-core';
import { DaskalosMaterialModule } from 'daskalos-material';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { FlowStepComponent } from './components/flow-step/flow-step.component';
import { FlowChoiceComponent } from './components/flow-choice/flow-choice.component';
import { FlowComponent } from './components/flow/flow.component';
import { FlowEndComponent } from './components/flow-end/flow-end.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    CountdownTimerComponent,
    FlowStepComponent,
    FlowChoiceComponent,
    FlowComponent,
    FlowEndComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DaskalosCoreModule,
    DaskalosMaterialModule,
  ],
  exports: [
    ConfirmDialogComponent,
    CountdownTimerComponent,
    FlowStepComponent,
    FlowChoiceComponent,
    FlowComponent,
    FlowEndComponent,
    SafeHtmlPipe,
  ],
})
export class DaskalosUiModule {}
