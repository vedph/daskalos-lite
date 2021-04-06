import { Component, OnInit } from '@angular/core';
import { LocalFlowsService } from 'daskalos-api';
import { Flow } from 'daskalos-core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public flow: Flow | undefined;

  constructor(private _flowService: LocalFlowsService) { }

  ngOnInit(): void {
    this.load('demo');
  }

  public load(id: string): void {
    this._flowService.getFlow(id).pipe(take(1)).subscribe(f => {
      this.flow = f;
    });
  }
}
