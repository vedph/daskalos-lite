import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowChoice } from 'daskalos-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[daskalos-flow-choice]',
  templateUrl: './flow-choice.component.html',
  styleUrls: ['./flow-choice.component.css'],
})
export class FlowChoiceComponent implements OnInit {
  private _choice: FlowChoice | undefined;

  @Input() get choice(): FlowChoice | undefined {
    return this._choice;
  }
  set choice(value: FlowChoice | undefined) {
    this._choice = value;
    this.setupForm();
  }
  @Input() multiple: boolean;
  @Output() checkedChange: EventEmitter<FlowChoice>;

  // form
  public checked: FormControl;
  public content: FormControl;
  public choiceGroup: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.multiple = false;
    this.checkedChange = new EventEmitter<FlowChoice>();
    // form
    this.checked = formBuilder.control(false);
    this.content = formBuilder.control(null);
    this.choiceGroup = formBuilder.group({
      checked: this.checked,
      content: this.content,
    });
  }

  private setupForm() {
    this.checked.valueChanges.subscribe(() => {
      // we must notify our container step, which handles
      // checking/unchecking other choices as appropriate
      if (this._choice) {
        this._choice.checked = this.checked.value;
        this.checkedChange.emit(this._choice);
      }
    });
  }

  ngOnInit(): void {
    this.setupForm();
  }
}
