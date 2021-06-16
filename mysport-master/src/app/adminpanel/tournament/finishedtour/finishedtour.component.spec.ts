import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedtourComponent } from './finishedtour.component';

describe('FinishedtourComponent', () => {
  let component: FinishedtourComponent;
  let fixture: ComponentFixture<FinishedtourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedtourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
