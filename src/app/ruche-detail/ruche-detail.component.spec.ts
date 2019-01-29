import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RucheDetailComponent } from './ruche-detail.component';

describe('RucheDetailComponent', () => {
  let component: RucheDetailComponent;
  let fixture: ComponentFixture<RucheDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucheDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
