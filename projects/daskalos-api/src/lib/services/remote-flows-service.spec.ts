import { TestBed } from '@angular/core/testing';

import { RemoteFlowsService } from './remote-flows-service';

describe('RemoteFlowsService', () => {
  let service: RemoteFlowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteFlowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
