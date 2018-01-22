import { TestBed, inject } from '@angular/core/testing';
import { Http, Response, HttpModule } from '@angular/http';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [GetDataService]
    });
  });

  it('should be created', inject([GetDataService], (service: GetDataService) => {
    expect(service).toBeTruthy();
  }));
});
