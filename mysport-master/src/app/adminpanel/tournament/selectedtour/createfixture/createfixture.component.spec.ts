import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefixtureComponent } from './createfixture.component';

describe('CreatefixtureComponent', () => {
  let component: CreatefixtureComponent;
  let fixture: ComponentFixture<CreatefixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
