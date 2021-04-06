import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Flow,
  FlowStep,
  FlowUserChoice,
  FlowUserStep,
  FlowUserSummary,
} from 'daskalos-core';

/**
 * Running flow.
 */
@Component({
  selector: 'daskalos-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent implements OnInit {
  private _flow: Flow | undefined | null;
  private _prevStepNumber: number;
  private _stepBackAllowed: boolean;

  public completed: boolean | undefined;
  public summary: FlowUserSummary | undefined;
  public step: FlowStep | undefined;
  public canStepBack: boolean;

  @Input() get flow(): Flow | undefined | null {
    return this._flow;
  }
  set flow(value: Flow | undefined | null) {
    this.completed = false;
    this._flow = value;
    if (value) {
      this._stepBackAllowed = value.steps.every(
        (s: FlowStep) => s.timeAllotted === 0
      );
    } else {
      this._stepBackAllowed = false;
    }
    this.updateCanStepBack();
    this.start();
  }

  @Output() stepChanged: EventEmitter<FlowStep>;
  @Output() stepAnswered: EventEmitter<FlowUserStep>;
  @Output() closed: EventEmitter<FlowUserSummary>;

  constructor() {
    this._prevStepNumber = 0;
    this._stepBackAllowed = false;
    this.canStepBack = false;
    this.stepChanged = new EventEmitter<FlowStep>();
    this.stepAnswered = new EventEmitter<FlowUserStep>();
    this.closed = new EventEmitter<FlowUserSummary>();
  }

  ngOnInit() {}

  private updateCanStepBack() {
    this.canStepBack =
      this._stepBackAllowed && this.step && this.step.number > 1 ? true : false;
  }

  /**
   * Start the flow.
   */
  public start() {
    if (!this._flow || this._flow.steps.length === 0) {
      return;
    }
    this.completed = false;
    this.summary = undefined;
    this._prevStepNumber = 0;
    this.step = this._flow.steps[0];
    this.updateCanStepBack();
    this.stepChanged.emit(this.step);
  }

  public onStepBack(number: number) {
    if (this._prevStepNumber < 1 || !this._flow) {
      return;
    }
    this.step = this._flow.steps.find((s) => s.number === this._prevStepNumber);
    this.updateCanStepBack();
    this.summary?.steps.pop();
    this.stepChanged.emit(this.step);
  }

  public onStepForward(answer: FlowUserStep) {
    if (!this._flow) {
      return;
    }
    if (!this.summary) {
      this.summary = {
        id: this._flow.id,
        label: this._flow.label,
        minScore: this._flow.minScore,
        steps: [],
      };
    }
    this.summary.steps.push(answer);
    this.stepAnswered.emit(answer);

    // close if no more steps / target is 0 or does not exist
    if (
      this.step &&
      this._flow.steps.indexOf(this.step) === this._flow.steps.length - 1
    ) {
      this.closed.emit(this.summary);
    }
    let targetStepNr = 0;

    // if expired, goto the designed step
    if (answer.choices.every((c: FlowUserChoice) => !c.checked)) {
      targetStepNr = this.step?.expiredTarget || 0;
    } else {
      // if choice was selected, goto its target step
      targetStepNr =
        answer.choices.find((c: FlowUserChoice) => c.checked)
          ?.targetStepNumber || 0;
    }

    // if the target step is the end of the flow, close it
    // (end=target step less than 1, or not existing in the flow)
    if (
      answer.choices?.length &&
      (!targetStepNr ||
        targetStepNr < 1 ||
        this._flow.steps.every((s: FlowStep) => s.number !== targetStepNr))
    ) {
      this.closed.emit(this.summary);
      this.completed = true;
      return;
    }

    // determine the next step
    let nextStep: FlowStep | undefined = undefined;
    if (targetStepNr) {
      nextStep = this._flow.steps.find(
        (s: FlowStep) => s.number === targetStepNr
      );
    }
    if (!nextStep && this.step) {
      const i = this._flow.steps.indexOf(this.step);
      nextStep = this._flow.steps[i + 1];
    }

    this.step = nextStep;
    this.updateCanStepBack();
    this.stepChanged.emit(this.step);
  }

  public onStop(number: number) {
    this.closed.emit(this.summary);
    this.completed = true;
  }
}
