import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutecoachComponent } from './institutecoach.component';

describe('InstitutecoachComponent', () => {
  let component: InstitutecoachComponent;
  let fixture: ComponentFixture<InstitutecoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutecoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutecoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
