import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RucheListComponent } from './ruche-list.component';

describe('RucheListComponent', () => {
  let component: RucheListComponent;
  let fixture: ComponentFixture<RucheListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucheListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
