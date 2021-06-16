import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingfixtureComponent } from './ongoingfixture.component';

describe('OngoingfixtureComponent', () => {
  let component: OngoingfixtureComponent;
  let fixture: ComponentFixture<OngoingfixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingfixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingfixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
