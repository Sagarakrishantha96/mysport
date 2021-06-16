import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentprofileComponent } from './parentprofile.component';

describe('ParentprofileComponent', () => {
  let component: ParentprofileComponent;
  let fixture: ComponentFixture<ParentprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
