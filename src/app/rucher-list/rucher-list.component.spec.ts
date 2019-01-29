import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RucherListComponent } from './rucher-list.component';

describe('RucherListComponent', () => {
  let component: RucherListComponent;
  let fixture: ComponentFixture<RucherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
