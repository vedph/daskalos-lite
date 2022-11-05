import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ErrorService, Flow, FlowSupplierService } from 'daskalos-core';

@Injectable({
  providedIn: 'root',
})
export class RemoteFlowsService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _flowSupplier: FlowSupplierService
  ) {}

  /**
   * Get the flow with the specified ID.
   *
   * @param uri The flow's JSON file URI.
   */
  public getFlow(uri: string): Observable<Flow> {
    return this._http.get<Flow>(uri).pipe(
      retry(3),
      catchError(this._error.handleError),
      tap((flow) => this._flowSupplier.supply(flow))
    );
  }
}
