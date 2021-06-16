import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedfixtureComponent } from './selectedfixture.component';

describe('SelectedfixtureComponent', () => {
  let component: SelectedfixtureComponent;
  let fixture: ComponentFixture<SelectedfixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedfixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedfixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
