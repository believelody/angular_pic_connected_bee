import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RucherDetailComponent } from './rucher-detail.component';

describe('RucherDetailComponent', () => {
  let component: RucherDetailComponent;
  let fixture: ComponentFixture<RucherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
