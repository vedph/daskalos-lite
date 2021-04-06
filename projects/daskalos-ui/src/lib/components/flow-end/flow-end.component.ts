import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlowUserSummary, FlowUserStep, FlowUserChoice } from 'daskalos-core';

@Component({
  selector: 'daskalos-flow-end',
  templateUrl: './flow-end.component.html',
  styleUrls: ['./flow-end.component.css'],
})
export class FlowEndComponent implements OnInit {
  private _summary: FlowUserSummary | undefined;

  @Input()
  public get summary(): FlowUserSummary | undefined {
    return this._summary;
  }
  public set summary(value: FlowUserSummary | undefined) {
    if (this._summary === value) {
      return;
    }
    this._summary = value;
    this.calculateResult();
  }

  @Output()
  public repeat: EventEmitter<any>;

  public score: number;
  public success: boolean;
  public isFree: boolean;

  constructor() {
    this.score = 0;
    this.success = false;
    this.isFree = false;
    this.repeat = new EventEmitter<any>();
  }

  ngOnInit() {}

  private calculateResult() {
    if (!this._summary || this._summary.steps.length === 0) {
      return;
    }

    let total = 0;
    this._summary.steps.forEach((s: FlowUserStep) =>
      s.choices.forEach(
        (c: FlowUserChoice) => (total += c.checked ? c.score || 0 : 0)
      )
    );
    this.score = total;
    this.isFree =
      this._summary.steps.findIndex(
        (s) => s.choices.findIndex((c) => c.isFree) > -1
      ) > 1;
    this.success = !this.isFree && total >= this._summary.minScore;
  }

  public onRepeat(): void {
    this.repeat.emit();
  }
}
