import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRucheComponent } from './select-ruche.component';

describe('SelectRucheComponent', () => {
  let component: SelectRucheComponent;
  let fixture: ComponentFixture<SelectRucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
